"use client";

import React from "react";
import WindowFloat from "../utility/WindowFloat";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ message, onConfirm, onCancel }: Props) {
  return (
    <WindowFloat onClose={onCancel} className="w-100 p-4">
      <div className="flex flex-col items-end gap-4">
        <p className="text-gray-800 text-center">{message}</p>
        <div className="flex gap-1.5">
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </WindowFloat>
  );
}