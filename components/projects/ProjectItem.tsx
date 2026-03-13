"use client";

import { useState } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { updateProject } from "@/actions/updateProject";
import { deleteProject } from "@/actions/deleteProject";
import { Project } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { IoMdEye } from "react-icons/io";

interface Props {
  project: Project;
}

export default function ProjectItem({ project }: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(project.name);
  const [savedByKey, setSavedByKey] = useState<boolean>(false); // track Enter key save

  const router = useRouter();

  async function save() {

    if (project.name === name) {
      setEditing(false);
      setSavedByKey(false);
      return;
    }

    const confirmed: boolean = confirm(
      `Are you sure you want to save this project name "${name}"?`,
    );

    if (confirmed) {
      await updateProject(project.id, name);
    } else {
      setName(project.name);
    }
    setEditing(false);
    setSavedByKey(false); // reset the flag
  }

  async function handleDelete() {
    const confirmed: boolean = confirm(
      `Are you sure you want to delete this project name ${project.name} ?`,
    );

    if (confirmed) {
      // Call the server action
      await deleteProject(project.id);
      // Optionally, re-render or notify parent component
      console.log("Project deleted");
    }
  }

  return (
    <div className="my-2 bg-amber-200 p-2 flex items-center justify-between">
      {editing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            if (!savedByKey) save(); // only call if not already saved via Enter
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setSavedByKey(true);
              save();
            }
            if (e.key === "Escape") {
              setName(project.name);
              setEditing(false);
              setSavedByKey(false);
            }
          }}
          className="border px-2"
          autoFocus
        />
      ) : (
        <div>{project.name}</div>
      )}

      <div className="flex space-x-2">
        <button
          onClick={handleDelete}
          className="bg-red-300 hover:bg-red-400 p-1"
        >
          <RiDeleteBin2Line />
        </button>

        <button
          onClick={() => setEditing(true)}
          className="bg-blue-300 hover:bg-blue-400 p-1"
        >
          <MdDriveFileRenameOutline />
        </button>
        <button
          onClick={() => router.push(`/projects/lists_project/${project.id}`)}
          className="bg-green-300 hover:bg-green-400 p-1"
        >
          <IoMdEye />
        </button>
      </div>
    </div>
  );
}
