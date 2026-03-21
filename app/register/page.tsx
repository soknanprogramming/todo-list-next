"use client";

import { register } from "@/actions/register/register";
import { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  const [state, formAction] = useActionState(register, null);

  useEffect(() => {
    if (state?.message && state?.success === true) {
      if (state.success) {
        redirect("/signin");
      }
      alert(state.message);
    }
  }, [state]);

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Register Page</h1>
      {state?.success === false && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
          {state?.message}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-2 w-70">
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input className="border p-1 ml-2 rounded-sm" type="tel" name="username" id="username" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input className="border ml-2 p-1 rounded-sm" type="email" name="email" id="email" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="border ml-2 p-1 rounded-sm"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div>
          <button className="dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-400 hover:bg-gray-5 hover:cursor-pointer p-1 rounded-sm" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
