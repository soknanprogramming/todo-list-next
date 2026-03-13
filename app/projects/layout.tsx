"use server"

import TopBarProject from "@/components/projects/TopBarProject";
import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();
  if (!session?.user) return <h1> You are not logged in </h1>;

  return (
    <div className="flex flex-col w-full">
        <TopBarProject />
        <div>{children}</div>
    </div>
  );
}
