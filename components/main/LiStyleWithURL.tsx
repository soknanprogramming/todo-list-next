"use client"

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  path: string;
  children: React.ReactNode;
  className?: string;
}

const LiStyleURL: React.FC<Props> = ({ path, children, className=""}) => {
  const pathname = usePathname();
  return (
    <li className={className + "  " + (pathname === path  || (path !== "/" && pathname.startsWith(path))  ? "text-white" : "hover:text-blue-500")}>
    <Link href={path}>{children}</Link>
  </li>
  );
};

export default LiStyleURL;
