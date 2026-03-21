"use client";

import WindowFloat from "@/components/utility/WindowFloat";
import { useState, useEffect, useRef, useActionState } from "react";
import { Tag, Task } from "@/generated/prisma/client";
import { editTask } from "@/actions/project/task/editTask";
import { useRouter } from "next/navigation";

interface Props {
  onClose: () => void;
  task: Task;
}

export default function WindowEditTask({ onClose, task }: Props) {
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [state, formAction] = useActionState(editTask, null);

  // In your fetchCurrentTags useEffect, after setCurrentTags:

  // Toggle handler:
  function toggleTag(id: number) {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }

  useEffect(() => {
    async function fetchCurrentTags() {
      try {
        const response = await fetch(`/api/tags/task/${task.id}`);
        if (!response.ok) {
          console.error("API error:", response.status, response.statusText);
          return;
        }

        const data = await response.json();

        // Make sure data is an array
        setSelectedTagIds(data.map((tag: Tag) => tag.id));
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchCurrentTags();
  }, [task.id]);

  useEffect(() => {
    fetch("/api/tags")
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
      });
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
    <WindowFloat
      className="2xl:w-150 overflow-y-auto dark:bg-gray-900 dark:border-gray-700"
      onClose={onClose}
    >
      <h1 className="text-2xl text-gray-500 dark:text-gray-400 font-semibold mb-2">
        Task: <span className="text-3xl text-red-600">{task.title}</span>
      </h1>
      <form action={formAction}>
        <input type="hidden" value={String(task.id)} name="task_id" />
        <input type="hidden" value={String(task.projectId)} name="project_id" />
        <div className="flex flex-col">
          <label htmlFor="title">Task Name</label>
          <input
            className="w-100 border border-gray-300 rounded-sm p-2 ml-2 mt-1"
            type="text"
            name="title"
            id="title"
            required
            defaultValue={task.title}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            ref={ref}
            onInput={handleInput}
            required
            className="w-130 border ml-2 mt-1 border-gray-300 rounded-sm p-2"
            name="description"
            id="description"
            defaultValue={task.description ?? ""}
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="due_date">Due Date</label>
          <input
            required
            className="w-50 border ml-2 mt-1 border-gray-300 rounded-sm p-2"
            type="date"
            name="due_date"
            id="due_date"
            defaultValue={task.dueDate?.toISOString().split("T")[0] ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="priority">Priority</label>
          <select
            className="w-50 border ml-2 mt-1 border-gray-300 rounded-sm p-2
               dark:bg-gray-800 dark:text-white dark:border-gray-600"
            name="priority"
            defaultValue={task.priority?.toString() ?? ""}
            id="priority"
            required
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
          <div className="w-130 border ml-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 grid grid-cols-3 border-gray-300 rounded-sm p-2">
            {tags.map((tag) => (
              <div key={tag.id}>
                <input
                  type="checkbox"
                  name="tags"
                  id={String(tag.id)}
                  value={tag.id}
                  checked={selectedTagIds.includes(tag.id)}
                  onChange={() => toggleTag(tag.id)}
                  className="mr-1.5 hover:cursor-pointer"
                />
                <label
                  className="hover:cursor-pointer"
                  htmlFor={String(tag.id)}
                >
                  {tag.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            className="bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 hover:text-white hover:cursor-pointer px-2 py-1 rounded-sm ml-2 mt-3"
            type="submit"
          >
            Edit Task
          </button>
        </div>
      </form>
    </WindowFloat>
  );
}
