"use client";
import { useEffect } from "react";
import { useActionState } from "react";
import { addProject } from "@/actions/project";

const initialState = { success: false, message: "" };

export default function AddProjectForm() {
  const [state, formAction] = useActionState(addProject, initialState);

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }
  }, [state.message]);

  return (
    <div className="pt-2">
      <form action={formAction}>
        <input className="bg-amber-200" type="text" name="project_name" />
        <button className="bg-blue-200" type="submit">
          Add Project
        </button>
      </form>
    </div>
  );
}
