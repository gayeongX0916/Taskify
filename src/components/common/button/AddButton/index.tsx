import addBoxIcon from "@/assets/add_box_purple.svg";
import Image from "next/image";

type AddButtonProps = {
  mode: "column" | "dashboard" | "todo" | "delete";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function AddButton({
  mode,
  className,
  onClick,
  disabled,
}: AddButtonProps) {
  const getText = () => {
    switch (mode) {
      case "column":
        return "새로운 컬럼 추가하기";
      case "dashboard":
        return "새로운 대시보드";
      case "delete":
        return "대시보드 삭제하기";
      case "todo":
      default:
        return null;
    }
  };

  const showImage = mode !== "delete";
  const text = getText();

  return (
    <button
      onClick={onClick}
      className={`flex gap-x-[12px] justify-center items-center border border-D9D9D9 rounded-[10px] bg-white_FFFFFF ${
        className ?? "py-[20px]"
      }`}
      disabled={disabled}
    >
      {text && (
        <span className="text-md text-black_333236 md:text-lg">{text}</span>
      )}
      {showImage && (
        <Image src={addBoxIcon} alt="추가하기" width={22} height={22} />
      )}
    </button>
  );
}
