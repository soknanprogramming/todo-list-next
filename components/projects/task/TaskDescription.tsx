"use client";

import { useState } from "react";
import WindowFloat from "@/components/utility/WindowFloat";

interface Props {
  description: string;
  className?: string;
}

export default function TaskDescription({
  description,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`${className} rounded-sm right-5 left-5 bg-amber-50 p-1 transition-all duration-200 h-23`}
      >
        <p className={`text-gray-600 dark:text-gray-200 whitespace-pre-line text-sm line-clamp-3`}>
          {description || "No description"}
        </p>

        {description && (description.length > 100 || description.split('\n').length > 3) && (
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-blue-500 text-xs mt-1"
          >
            {open ? "Show less" : "Read more..."}
          </button>
        )}
      </div>
      {open && (
        <WindowFloat
          className="w-200 h-11/12 py-1 bg-gray-300"
          onClose={() => setOpen(false)}
        >
          <div className="flex flex-col h-full my-1">
            <div className="self-end">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className=" bg-amber-500 px-2 rounded-sm hover:cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="overflow-y-auto scrollbar-hide h-full m-2 rounded-sm bg-gray-200">
              <p className={`text-gray-600 whitespace-pre-line text-sm p-2`}>
                {description || "No description"}
              </p>
            </div>
          </div>
        </WindowFloat>
      )}
    </>
  );
}
