type LoginButtonPros = {
  disabled: boolean;
};

export function LoginButton({ disabled }: LoginButtonPros) {
  return (
    <button
      className="bg-violet_5534DA disabled:bg-gray_9FA6B2 flex justify-center items-center text-2lg text-white_FFFFFF radius-[8px] w-full py-[12px] md:py-[14px]"
      disabled={disabled}
    >
      로그인
    </button>
  );
}
