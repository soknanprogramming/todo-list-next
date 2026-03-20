"use client";

import WindowFloat from "@/components/utility/WindowFloat";
import { useState, useEffect, useRef, useActionState } from "react";
import { Tag, Project } from "@/generated/prisma/client";
import { addTask } from "@/actions/project/task/addTask";
import { useRouter } from "next/navigation";

interface Props {
  onClose: () => void;
  project: Project;
}

export default function WindowAddTask({ onClose, project }: Props) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [state, formAction] = useActionState(addTask, null);
  const router = useRouter();

  useEffect(() => {
    async function fetchTags() {
      const response = await fetch("/api/tags");
      const data = await response.json();
      setTags(data);
    }
    fetchTags();
  }, [onClose]);

  useEffect(() => {
    if (!state?.message) return;

    alert(state.message);

    if (state.success) {
      router.refresh();
      onClose();
    }
  }, [state, router, onClose]);

  const ref = useRef<HTMLTextAreaElement>(null);
  const handleInput = () => {
    const el = ref.current;
    if (!el) return;

    el.style.height = "auto";
    if (el.scrollHeight >= 328) {
      el.style.height = 328 + "px";
    } else {
      el.style.height = el.scrollHeight + "px";
    }
  };

  return (
    <WindowFloat className="2xl:w-150 overflow-y-auto" onClose={onClose}>
      <h1 className="text-2xl text-gray-500 font-semibold mb-2">
        Product: {project.name}
      </h1>
      <form action={formAction}>
        <input type="hidden" value={project.id} name="project_id" />
        <div className="flex flex-col">
          <label htmlFor="title">Task Name</label>
          <input
            required
            className="w-100 border border-gray-300 rounded-sm p-2 ml-2 mt-1"
            type="text"
            name="title"
            id="title"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            ref={ref}
            onInput={handleInput}
            required
            className="w-130 border ml-2 mt-1 border-gray-300 rounded-sm p-2"
            name="description"
            id="description"
          ></textarea>
        </div>

        <div>
          <label htmlFor="due_date">Due Date</label>
          <input
            required
            className="w-50 border ml-2 mt-1 border-gray-300 rounded-sm p-2"
            type="date"
            name="due_date"
            id="due_date"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="priority">Priority</label>
          <select
            className="w-50 border ml-2 mt-1 border-gray-300 rounded-sm p-2"
            name="priority"
            id="priority"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select priority
            </option>
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>
        </div>

        <div>
          <label>Tags</label>
          <div className="w-130 border ml-2 mt-1 bg-gray-100 grid grid-cols-3 border-gray-300 rounded-sm p-2">
            {tags.map((tag) => (
              <div key={tag.id}>
                <input
                  type="checkbox"
                  name="tags"
                  id={String(tag.id)}
                  value={tag.id}
                />
                <label htmlFor={String(tag.id)}>{tag.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            className="bg-gray-400 hover:bg-gray-500 hover:text-white hover:cursor-pointer px-2 py-1 rounded-sm ml-2 mt-3"
            type="submit"
          >
            Add Task
          </button>
        </div>
      </form>
    </WindowFloat>
  );
}
