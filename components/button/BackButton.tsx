"use client";

import { useRouter } from "next/navigation";

interface Props {
    className?: string;
    children: React.ReactNode;
}

export default function BackButton({ className = "", children }: Props) {
  const router = useRouter();

  return (
    <button className={className} onClick={() => router.back()}>
        {children}
    </button>
  );
}