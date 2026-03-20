"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdOutlineLightMode, MdNightlight } from "react-icons/md";
import { GrSystem } from "react-icons/gr";


export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <div>
        Theme: 
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setTheme("light")}
          className={`flex items-center hover:cursor-pointer px-3 py-1 rounded ${
            theme === "light"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
        >
          <MdOutlineLightMode className="mr-1.5" /> <span>Light</span>
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`flex items-center hover:cursor-pointer px-3 py-1 rounded ${
            theme === "dark"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
        >
          <MdNightlight className="mr-1.5"/> <span>Dark</span>
        </button>

        <button
          onClick={() => setTheme("system")}
          className={`px-3 flex items-center hover:cursor-pointer py-1 rounded ${
            theme === "system"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
        >
          <GrSystem className="mr-1.5" /> <span>System</span>
        </button>
      </div>
    </div>
  );
}
