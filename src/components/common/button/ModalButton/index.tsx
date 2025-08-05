import { ReactNode } from "react";

type ModalButtonProps = {
  mode: "any" | "cancel";
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
};

export function ModalButton({
  mode,
  children,
  onClick,
  disabled,
  className,
  type,
}: ModalButtonProps) {
  const isCancel = mode === "cancel";

  return (
    <button
      onClick={onClick}
      className={`rounded-[8px] flex justify-center items-center text-lg w-full ${
        isCancel
          ? "text-gray_787486 border border-gray_D9D9D9"
          : "bg-violet_5534DA text-white_FFFFFF"
      } ${className ?? "px-[46px] py-[14px]"}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
