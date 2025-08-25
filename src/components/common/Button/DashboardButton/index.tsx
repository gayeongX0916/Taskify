type DashboardButtonProps = {
  mode: "accept" | "deny";
  onClick?: () => void;
  isLoading: boolean;
};

export function DashboardButton({
  mode,
  onClick,
  isLoading,
}: DashboardButtonProps) {
  const isAccept = mode === "accept";

  return (
    <button
      disabled={isLoading}
      type="button"
      onClick={onClick}
      className={`flex justify-center items-center rounded-[4px] py-[7px] px-[37px] w-full text-xs md:w-[auto] md:px-[23px] md:py-[6px] md:text-md lg:px-[29px] lg:py-[7px]  ${
        isAccept
          ? "bg-violet_5534DA text-white_FFFFFF"
          : "bg-white_FFFFFF text-violet_5534DA border border-gray_D9D9D9"
      }`}
    >
      {mode === "accept" ? "수락" : "거절"}
    </button>
  );
}
