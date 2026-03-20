"use client";

import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  children: React.ReactNode;
  url?: string;
}

export default function BackButton({
  className = "",
  children,
  url = "",
}: Props) {
  const router = useRouter();

  return (
    <>
      {url === "" ? (
        <button className={className} onClick={() => router.back()}>
          {children}
        </button>
      ) : (
        <button className={className} onClick={() => router.push(url)}>
          {children}
        </button>
      )}
    </>
  );
}
