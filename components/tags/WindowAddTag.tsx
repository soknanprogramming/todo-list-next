"use client";

import WindowFloat from "../utility/WindowFloat";
import { useActionState, useEffect } from "react";
import { addTag } from "@/actions/tag/addTag";
import { useRouter } from "next/navigation";

interface Props {
  onClose: () => void;
}

export default function WindowAddTag({ onClose }: Props) {
  const [state, formAction] = useActionState(addTag, null);
  const router = useRouter();

  useEffect(() => {
    if (!state?.message) return;

    alert(state.message);

    if (state.success) {
      router.refresh(); 
      onClose();
    }
  }, [state, router, onClose]);

  return (
    <WindowFloat onClose={onClose}>
      <form className="space-y-2" action={formAction}>
        <div className="space-x-2">
          <label htmlFor="tag">Lag :</label>
          <input name="tag" id="tag" className="bg-amber-200" type="text" />
        </div>
        <div className="space-x-2">
          <button
            type="submit"
            className="bg-red-300 hover:bg-red-400 hover:cursor-pointer py-0.5 px-1 rounded-sm"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-red-300 hover:bg-red-400 py-0.5 px-1 hover:cursor-pointer rounded-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </WindowFloat>
  );
}
