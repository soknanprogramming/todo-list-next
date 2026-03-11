"use client";

import { useActionState } from "react";
import { addProject } from "@/actions/project";

const initialState = { success: false, message: "" };

export default function AddProjectForm() {
  const [state, formAction] = useActionState(addProject, initialState);

  return (
    <div>
      <form action={formAction}>
        <input className="bg-amber-200" type="text" name="project_name" />
        <button className="bg-blue-200" type="submit">Add Project</button>
      </form>

      {state.message && (
        <p style={{ color: state.success ? "green" : "red" }}>
          {state.message}
        </p>
      )}
    </div>
  );
}