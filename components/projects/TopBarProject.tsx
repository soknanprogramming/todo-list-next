"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ImMenu3, ImMenu4 } from "react-icons/im";

interface Props {
  className?: string;
}

const TopBarProject: React.FC<Props> = ({ className = "" }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function handleChangeRoute(path: string) {
    router.push(path);
    setIsOpen(false);
  }

  return (
    <div className={`flex items-center  ${className}`}>
      <div className="mx-2">
        <ul className="flex space-x-1">
          <li
            onClick={() => handleChangeRoute("/projects/add_project")}
            className={
              "p-1 hover:cursor-pointer rounded-sm " +
              (pathname === "/projects/add_project"
                ? "bg-amber-700 text-white"
                : "bg-yellow-400 hover:bg-amber-600")
            }
          >
            Create Project
          </li>
          <li
            onClick={() => handleChangeRoute("/projects/lists_project")}
            className={
              "p-1 hover:cursor-pointer rounded-sm " +
              (pathname.startsWith("/projects/lists_project")
                ? "bg-amber-700 text-white"
                : "bg-yellow-400 hover:bg-amber-600")
            }
          >
            List Project
          </li>
        </ul>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="hover:cursor-pointer"
        >
          {isOpen ? (
            <ImMenu3 className="size-10 hover:text-red-500" />
          ) : (
            <ImMenu4 className="size-10 hover:text-red-500" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="absolute shadow shadow-blue-700 top-10.5 right-0 w-30 self-center list-none dark:bg-yellow-950 bg-yellow-500 rounded-sm">
          <nav>
            <ul className="flex flex-col">
              <li
                onClick={() => handleChangeRoute("/projects")}
                className={
                  "p-1 hover:cursor-pointer " +
                  (pathname === "/projects"
                    ? "bg-amber-700 text-white"
                    : "bg-yellow-400 hover:bg-amber-600")
                }
              >
                Project Home
              </li>
              <li
                onClick={() => handleChangeRoute("/projects/add_project")}
                className={
                  "p-1 hover:cursor-pointer " +
                  (pathname === "/projects/add_project"
                    ? "bg-amber-700 text-white"
                    : "bg-yellow-400 hover:bg-amber-600")
                }
              >
                Create Project
              </li>
              <li
                onClick={() => handleChangeRoute("/projects/lists_project")}
                className={
                  "p-1 hover:cursor-pointer " +
                  (pathname.startsWith("/projects/lists_project")
                    ? "bg-amber-700 text-white"
                    : "bg-yellow-400 hover:bg-amber-600")
                }
              >
                List Project
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TopBarProject;
