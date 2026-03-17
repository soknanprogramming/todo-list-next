"use client";
import { useEffect } from "react";
import { useActionState } from "react";
import { addProject } from "@/actions/project/addProject";
import { useRouter } from "next/navigation";


const initialState = { success: false, message: "" };

export default function AddProjectForm() {
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
