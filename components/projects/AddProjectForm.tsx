"use client";
import { useEffect } from "react";
import { useActionState } from "react";
import { addProject } from "@/actions/project/addProject";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

const initialState = { success: false, message: "" };

export default function AddProjectForm({ className = "" }: Props) {
  const [state, formAction] = useActionState(addProject, initialState);
  const router = useRouter();


  useEffect(() => {
    if (state.message) {
      alert(state.message);
      if (state.success) {
        router.refresh();
      }
    }
  }, [state.message, state.success, router]);

  return (
    <div className={`pt-2 ${className}`}>
      <form className="flex gap-1" action={formAction}>
        <input required placeholder="Project name !" className="bg-amber-200 px-2 py-1 rounded-sm border border-amber-500" type="text" name="project_name" />
        <button className="bg-blue-200 hover:bg-blue-300 hover:text-white hover:cursor-pointer rounded-sm px-2 py-1" type="submit">
          Add New
        </button>
      </form>
    </div>
  );
}
