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
    <div>
      <h1>Register Page</h1>
      {state?.success === false && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
          {state?.message}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-2">
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
          <input
            className="border"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div>
          <button className="border" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
