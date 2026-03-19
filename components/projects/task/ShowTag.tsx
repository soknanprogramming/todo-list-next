import { Tag } from "@/generated/prisma/client";
import { useEffect, useRef, useState } from "react";
import { IoPricetagOutline } from "react-icons/io5";

interface Props {
  className?: string;
  tags: Array<Tag>;
}

export default function ShowTag({ className = "", tags }: Props) {
  return (
    <div className={`flex overflow-x-auto scrollbar-hide gap-2 mt-4 ${className}`}>
            {tags.length > 0 ? (
              tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-100 flex items-center text-gray-700 text-xs px-2 py-1 rounded-md"
                >
                  <IoPricetagOutline className="mr-0.5" />
                  <p>{tag.name}</p>
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No tags</span>
            )}
          </div>
  )
}
