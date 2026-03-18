"use client";

import React, { useEffect } from "react";
import WindowFloat from "../utility/WindowFloat";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ message, onConfirm, onCancel }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onConfirm();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onConfirm, onCancel]);

  return (
    <WindowFloat onClose={onCancel} className="w-100 p-4">
      <div className="flex flex-col gap-4">
        <p className="text-gray-800 text-center">{message}</p>
        <div className="flex gap-1.5 self-end">
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-blue-600 hover:cursor-pointer text-white rounded hover:bg-blue-700"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-300 hover:cursor-pointer text-gray-700 rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </WindowFloat>
  );
}