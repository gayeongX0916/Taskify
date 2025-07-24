import addBoxIcon from "@/assets/add_box_purple.svg";
import Image from "next/image";
import { ReactNode } from "react";

type AddButtonProps = {
  mode: "column" | "dashboard" | "todo" | "delete";
  className?:string;
};

export function AddButton({ mode,className }: AddButtonProps) {
  const getText = () => {
    switch (mode) {
      case "column":
        return "새로운 칼럼 추가하기";
      case "dashboard":
        return "새로운 대시보드 추가하기";
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
    <button className={`flex gap-x-[12px] justify-center items-center py-[20px] border border-D9D9D9 rounded-[10px] ${className ?? ""}`}>
      {text && (
        <span className="text-lg text-black_333236 md:text-2lg font-bold">
          {text}
        </span>
      )}
      {showImage && (
        <Image src={addBoxIcon} alt="추가하기" width={22} height={22} />
      )}
    </button>
  );
}
