"use client";
import { useState } from "react";
import WindowAddTag from "./WindowAddTag";

interface Props {
  className?: string;
}

export default function UserReaction({ className = "" }: Props) {
    const [isOpenAddTag, setIsOpenAddTag] = useState<boolean>(false);

    return (
    <div>
      <button
        className={`${className} bg-gray-300 border border-gray-400 py-0.5 px-1 rounded-sm hover:bg-gray-400 hover:cursor-pointer`}
        onClick={() => setIsOpenAddTag(true)}
      >
        Add Tag
      </button>
      {isOpenAddTag && <WindowAddTag onClose={() => setIsOpenAddTag(false)} />}
    </div>
  );
}
