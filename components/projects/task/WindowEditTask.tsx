"use client";

import WindowFloat from "@/components/utility/WindowFloat";
import { useState, useEffect, useActionState } from "react";
import { Tag, Task } from "@/generated/prisma/client";
import { editTask } from "@/actions/project/task/editTask";
import { useRouter } from "next/navigation";

interface Props {
  onClose: () => void;
  task: Task;
}

export default function WindowEditTask({ onClose, task }: Props) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [state, formAction] = useActionState(editTask, null);
  const router = useRouter();

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

  return (
    <WindowFloat onClose={onClose}>
      <h1>Task Name: {task.title}</h1>
      <form action={formAction}>
        <input type="hidden" value={String(task.id)} name="task_id" />
        <input type="hidden" value={String(task.projectId)} name="project_id" />
        <div>
          <label htmlFor="title">Task Name</label>
          <input
            type="text"
            className="border"
            name="title"
            id="title"
            required
            defaultValue={task.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            required
            className="border"
            name="description"
            id="description"
            defaultValue={task.description ?? ""}
          ></textarea>
        </div>
        <div>
          <label htmlFor="due_date">Due Date</label>
          <input
            required
            className="border"
            type="date"
            name="due_date"
            id="due_date"
            defaultValue={task.dueDate?.toISOString().split("T")[0] ?? ""}
          />
        </div>
        <div>
          <label htmlFor="priority">Priority</label>
          <select
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
          <div className="bg-amber-200 p-2">
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
          <button type="submit">Edit Task</button>
        </div>
      </form>
    </WindowFloat>
  );
}
