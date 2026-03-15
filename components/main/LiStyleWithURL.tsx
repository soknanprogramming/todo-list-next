"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props {
  path: string;
  children: React.ReactNode;
  className?: string;
}

const LiStyleURL: React.FC<Props> = ({ path, children, className = "" }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <li
      onClick={() => router.push(path)}
      className={
        className +
        " py-2 hover:cursor-pointer px-4 " +
        (pathname === path || (path !== "/" && pathname.startsWith(path))
          ? "bg-yellow-600 text-white"
          : "hover:text-blue-500 hover:bg-yellow-400")
      }
    >
      {children}
    </li>
  );
};

export default LiStyleURL;
