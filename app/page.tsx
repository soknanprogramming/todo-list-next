// import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
// import { SignIn } from "@/components/auth/signin-button";


export default async function Home() {
  const session = await auth();
 if (!session?.user) return redirect("/signin");


  return (
    <div className="text-2xl font-semibold">Welcome <span className="text-blue-600">{session?.user?.name ?? "Guest"}</span></div>
  );
}
