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
    <div className="fixed top-[20px] left-1/2 -translate-x-1/2 flex flex-col gap-2 z-[9999]">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          className={`px-[12px] py-[8px] text-sm md:text-lg md:px-[20px] md:py-[13px] rounded-[8px] text-white animate-fadeOut whitespace-nowrap
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
        </button>
      ))}
    </div>
  );
}
