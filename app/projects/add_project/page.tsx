"use client";

import { useActionState } from "react";
import { addProject } from "@/actions/project";

const initialState = { success: false, message: "" };

export default function AddProjectForm() {
  const [state, formAction] = useActionState(addProject, initialState);

  return (
    <div>
      <form action={formAction}>
        <input type="text" name="project_name" />
        <button type="submit">Add Project</button>
      </form>

      {state.message && (
        <p style={{ color: state.success ? "green" : "red" }}>
          {state.message}
        </p>
      )}
    </div>
  );
}