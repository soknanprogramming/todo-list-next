"use client";

import { Tag } from "@/generated/prisma/client";
import { updateTag } from "@/actions/tag/updateTag";
import { useConfirm } from "@/hooks/useConfirm";
import { IoPricetagOutline } from "react-icons/io5";
import { useActionState, useState, useEffect, startTransition } from "react";

interface Props {
  tag: Tag;
  className?: string;
}

export default function TagItem({ tag, className = "" }: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(tag.name);
  const [savedByKey, setSavedByKey] = useState<boolean>(false);
  const { confirm, modal } = useConfirm();
  const [state, updateTagAction] = useActionState(updateTag, null);

  async function save() {
    if (tag.name === name) {
      setEditing(false);
      setSavedByKey(false);
      return;
    }

    const confirmed: boolean = await confirm(
      `Are you sure you want to save this tag name "${name}"?`,
    );

    if (confirmed) {
      const formData = new FormData();
      formData.append("id", tag.id.toString());
      formData.append("tag", name);
      startTransition(() => {
        updateTagAction(formData); // call inside startTransition
      });
    } else {
      setName(tag.name);
    }
    setEditing(false);
    setSavedByKey(false);
  }

  useEffect(() => {
    if (!state?.message) return;

    alert(state.message);
  }, [state]);

  return (
    <div
      onClick={() => setEditing(true)}
      className={` bg-amber-200 flex items-center gap-1.5 p-1 ${className}`}
    >
      <IoPricetagOutline />
      <span>
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
      </span>

      {modal}
    </div>
  );
}
