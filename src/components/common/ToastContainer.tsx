"use client";

import { useToastStore } from "@/lib/stores/toast";
import { useEffect } from "react";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), 3000)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [toasts, removeToast]);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[9999]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow-lg text-white transition
            ${
              toast.type === "error"
                ? "bg-red-500"
                : toast.type === "success"
                ? "bg-green-500"
                : "bg-gray-800"
            }
          `}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
