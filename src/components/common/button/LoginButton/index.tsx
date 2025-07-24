import { Children, ReactNode } from "react";

type LoginButtonPros = {
  disabled: boolean;
  children: ReactNode;
  onClick?: () => void;
};

export function LoginButton({ disabled, children, onClick }: LoginButtonPros) {
  return (
    <button
      onClick={onClick}
      className="bg-violet_5534DA disabled:bg-gray_9FA6B2 flex justify-center items-center text-2lg text-white_FFFFFF rounded-[8px] w-full py-[14px]"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
