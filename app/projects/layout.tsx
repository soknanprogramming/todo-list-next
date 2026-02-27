import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full">
        <div className="border min-w-300 self-center sticky top-0 py-2 px-10 list-none dark:bg-black bg-white rounded-lg">
            <nav>
                <ul>
                    <li className="hover:text-blue-500">
                        <Link href="/projects/add_project">Create Project</Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div>{children}</div>
    </div>
  );
}
