"use client";

import { useState } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { updateProject } from "@/actions/updateProject";
import { deleteProject } from "@/actions/deleteProject";

export default function ProjectItem({ project }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);

  async function save() {
    await updateProject(project.id, name);
    setEditing(false);
  }

  return (
    <div className="my-2 bg-amber-200 p-2 flex items-center justify-between">
      {editing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={save}
          className="border px-2"
          autoFocus
        />
      ) : (
        <div>{project.name}</div>
      )}

      <div className="flex space-x-2">
        <form action={deleteProject.bind(null, project.id)}>
          <button className="bg-red-300 hover:bg-red-400 p-1">
            <RiDeleteBin2Line />
          </button>
        </form>

        <button
          onClick={() => setEditing(true)}
          className="bg-blue-300 hover:bg-blue-400 p-1"
        >
          <MdDriveFileRenameOutline />
        </button>
      </div>
    </div>
  );
}