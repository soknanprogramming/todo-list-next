"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-full">
        <div className="border min-w-300 self-center sticky top-0 px-10 list-none dark:bg-yellow-950 bg-yellow-500 rounded-lg">
            <nav>
                <ul className="flex space-x-1">
                    <li className={"p-1 " + (pathname === "/projects" ? "bg-amber-700 text-white" : "bg-yellow-400 hover:bg-amber-600")}>
                        <Link href="/projects">Project Home</Link>
                    </li>
                    <li className={"p-1 " + (pathname === "/projects/add_project" ? "bg-amber-700 text-white" : "bg-yellow-400 hover:bg-amber-600")}>
                        <Link href="/projects/add_project">Create Project</Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div>{children}</div>
    </div>
  );
}
