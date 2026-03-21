"use server";

// import TopBarProject from "@/components/projects/TopBarProject";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="flex flex-col w-full">
      {/* <div  className="w-full flex sticky top-4 z-50 items-center">
          <div className="bg-amber-700 flex-1">Project Page</div>
          <TopBarProject className="self-end" />
        </div> */}
      <div>{children}</div>
    </div>
  );
}
