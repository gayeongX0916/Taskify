import { ReactNode } from "react";

type ActionButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function ActionButton({
  children,
  className,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      className={`border border-gray_D9D9D9 rounded-[4px] px-[15px] py-[4px] text-xs text-violet_5534DA md:px-[29px] md:py-[7px] ${
        className ?? ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
