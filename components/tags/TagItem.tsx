"use client";

import { Tag } from "@/generated/prisma/client";
import { useState } from "react";
import { updateTag } from "@/actions/tag/updateTag";

interface Props {
  tag: Tag;
}

export default function TagItem({ tag }: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(tag.name);
  const [savedByKey, setSavedByKey] = useState<boolean>(false);

  async function save() {
    if (tag.name === name) {
      setEditing(false);
      setSavedByKey(false);
      return;
    }

    const confirmed: boolean = confirm(
      `Are you sure you want to save this tag name "${name}"?`,
    );

    if (confirmed) {
      await updateTag(tag.id, name);
    } else {
      setName(tag.name);
    }
    setEditing(false);
    setSavedByKey(false);
  }

  return (
    <div onClick={() => setEditing(true)} className="mt-1 bg-amber-200">
      {editing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          onBlur={() => {
            if (!savedByKey) save();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setSavedByKey(true);
              save();
            }
            if (e.key === "Escape") {
              setName(tag.name);
              setEditing(false);
              setSavedByKey(false);
            }
          }}
        />
      ) : (
        <span>{tag.name}</span>
      )}
    </div>
  );
}
