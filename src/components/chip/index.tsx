import Image from "next/image";
import checkIcon from "@/assets/check_icon.svg";

type ChipProps={
  list:string;
}

export function Chip({list}:ChipProps) {
  return (
    <div className="flex items-center gap-x-[8px]">
      <Image src={checkIcon} alt="체크" />
      <button className="bg-violet_8P flex items-center gap-x-[9px] rounded-[16px] px-[10px] py-[4px]">
        <div className="w-[6px] h-[6px] bg-violet_5534DA rounded-full"></div>
        <span className="text-violet_5534DA text-md">{list}</span>
      </button>
    </div>
  );
}
