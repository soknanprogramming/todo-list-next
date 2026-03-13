// import Image from "next/image";
// import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignIn } from "@/components/auth/signin-button";


export default async function Home() {
  const session = await auth();
 if (!session?.user) return <SignIn />;


  return (
    <div>Welcome {session?.user?.name ?? "Guest"}</div>
  );
}
