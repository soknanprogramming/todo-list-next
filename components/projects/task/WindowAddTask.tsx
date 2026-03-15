"use client";

import WindowFloat from "@/components/utility/WindowFloat";
import { useState, useEffect } from "react";
import { Tag, Project } from "@/generated/prisma/client";

interface Props {
  onClose: () => void;
  project: Project;
}

export default function WindowAddTask({ onClose, project}: Props) {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function fetchTags() {
      const response = await fetch("/api/tags");
      const data = await response.json();
      setTags(data);
    }
    fetchTags();
  }, [onClose]);

  return (
    <WindowFloat onClose={onClose}>
      <h1>Product: {project.name}</h1>
      <form action="">
        <input type="hidden" value={project.id} name="project_id" />
        <div>
          <label htmlFor="title">Task Name</label>
          <input className="border" type="text" name="title" id="title" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            className="border"
            name="description"
            id="description"
          ></textarea>
        </div>

        <div>
          <label htmlFor="priority">Priority</label>
          <select name="priority" id="priority" required defaultValue="">
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
          <button type="submit">Add Task</button>
        </div>
      </form>
    </WindowFloat>
  );
}
