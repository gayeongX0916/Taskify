import { ReactNode } from "react";

type ModalButtonProps = {
  mode: "any" | "cancel";
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export function ModalButton({
  mode,
  children,
  onClick,
  disabled,
}: ModalButtonProps) {
  const isCancel = mode === "cancel";

  return (
    <button
      onClick={onClick}
      className={`rounded-[8px] flex justify-center items-center px-[46px] py-[14px] text-lg w-full ${
        isCancel
          ? "text-gray_787486 border border-gray_D9D9D9"
          : "bg-violet_5534DA text-white_FFFFFF"
      }`}
      disabled={disabled}
    >
      {mode === "cancel" ? "취소" : children}
    </button>
  );
}
