"use client";

import { useState } from "react";
import ConfirmModal from "@/components/modal/ConfirmModal";

export function useConfirm() {
  const [options, setOptions] = useState<{
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
  } | null>(null);

  const confirm = async (message: string) =>
    new Promise<boolean>((resolve) => {
      setOptions({
        message,
        onConfirm: () => {
          resolve(true);
          setOptions(null);
        },
        onCancel: () => {
          resolve(false);
          setOptions(null);
        },
      });
    });

  const modal = options ? (
    <ConfirmModal
      message={options.message}
      onConfirm={options.onConfirm}
      onCancel={options.onCancel!}
    />
  ) : null;

  return { confirm, modal };
}