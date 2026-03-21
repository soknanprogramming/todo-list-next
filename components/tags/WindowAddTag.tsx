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
    <WindowFloat className="w-105 h-20 dark:bg-gray-900 dark:border-gray-700" onClose={onClose}>
      <form className="space-y-2 flex items-center" action={formAction}>
        <div className="space-x-2 flex items-center">
          <label htmlFor="tag">Tag :</label>
          <input required placeholder="New tag name" name="tag" id="tag" className="bg-amber-200 dark:bg-amber-900 py-0.5 px-2 rounded-sm" type="text" />
        </div>
        <div className="space-x-2 flex ml-4 items-center">
          <button
            type="submit"
            className="dark:bg-red-900 dark:hover:bg-red-800 bg-red-300 hover:bg-red-400  hover:cursor-pointer py-0.5 px-1 rounded-sm"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-red-300 hover:bg-red-400 dark:bg-red-900 dark:hover:bg-red-800 py-0.5 px-1 hover:cursor-pointer rounded-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </WindowFloat>
  );
}
