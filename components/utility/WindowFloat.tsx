import React from "react";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}


export default function WindowFloat({ children, onClose, className = ""}: Props) {
  return (
    <div
      onClick={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-amber-50 border max-h-full border-gray-300 p-6 rounded w-100 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}