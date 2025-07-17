import { ReactNode } from "react";

type LoginButtonPros = {
  disabled: boolean;
};

export function LoginButton({ disabled }: LoginButtonPros) {
  return (
    <button
      className="bg-violet_5534DA disabled:bg-gray_9FA6B2 flex justify-center items-center text-2lg text-white_FFFFFF rounded-[8px] w-full py-[12px] md:py-[14px]"
      disabled={disabled}
    >
      로그인
    </button>
  );
}

type DashboardButtonProps = {
  mode: "accept" | "deny";
};

export function DashboardButton({ mode }: DashboardButtonProps) {
  const isAccept = mode === "accept";

  return (
    <button
      className={`rounded-[4px] py-[7px] px-[44px] text-xs md:px-[23px] md:py-[6px] md:text-md lg:px-[29px] lg:py-[7px]  ${
        isAccept
          ? "bg-violet_5534DA text-white_FFFFFF"
          : "bg-white_FFFFFF text-violet_5534DA border border-gray_D9D9D9"
      }`}
    >
      {mode === "accept" ? "수락" : "거절"}
    </button>
  );
}

type ModalButtonProps = {
  mode: "any" | "cancel";
  children: ReactNode;
};

export function ModalButton({ mode, children }: ModalButtonProps) {
  const isCancel = mode === "cancel";

  return (
    <button
      className={`rounded-[8px] px-[46px] py-[11px] text-lg font-semibold md:font-medium md:px-[56px] md:py-[9px] ${
        isCancel
          ? "text-gray_787486 border border-gray_D9D9D9"
          : "bg-violet_5534DA text-white_FFFFFF"
      }`}
    >
      {mode === "cancel" ? "취소" : children}
    </button>
  );
}
