import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


const RegisterPage = () => {
    const registerUser = async (formData: FormData) => {
        "use server";

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            await prisma.user.create({
                data: {
                    name: username as string,
                    email: email as string,
                    password: password as string,
                },
            });
            redirect("/login");
        }
        catch (e) {
            console.error("Failed to create user:", e);
        }

    }
    return(
        <div>
            <h1>Register Page</h1>
            <form action={registerUser} className="flex flex-col gap-2">
                <div>
                    <label htmlFor="username">Username</label>
                    <input className="border" type="tel" name="username" id="username" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="border" type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input className="border" type="password" name="password" id="password" />
                </div>
                <div>
                    <button className="border" type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;