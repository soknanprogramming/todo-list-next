"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { refreshAndRedirect } from "@/actions/refreshAndRedirect";


export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // ← prevents NextAuth from redirecting on error
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
        await refreshAndRedirect();
    }
  };

  return (
    <form className="flex flex-col space-y-2 w-80" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}
      <input
        required
        className="bg-amber-400 border border-amber-300 dark:bg-amber-800 dark:border-amber-700 rounded-sm py-1 px-2"
        placeholder="Email"
        name="email"
        type="email"
      />
      <input
        required
        className="bg-amber-400 border border-amber-300 dark:bg-amber-800 dark:border-amber-700 rounded-sm py-1 px-2"
        placeholder="Password"
        name="password"
        type="password"
      />
      <div className="flex justify-between text-center space-x-2">
        <button
          className="bg-gray-400 hover:bg-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 hover:cursor-pointer rounded-sm w-full p-1 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <Link
          className="bg-gray-400 hover:bg-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-sm w-full p-1"
          href="/register"
        >
          Register
        </Link>
      </div>
    </form>
  );
}
