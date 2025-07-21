import Image from "next/image";
import settingIcon from "@/assets/setting_icon.svg";
import { AddButton } from "../common/button/AddButton";
import { ColumnCard } from "./card";

export function Column() {
  return (
    <div className="px-[12px] py-[16px]">
      <div className="flex items-center justify-between mb-[24px]">
        <div className="flex items-center gap-x-[8px]">
          <div className="w-[8px] h-[8px] bg-violet_5534DA rounded-full"></div>
          <div className="flex items-center gap-x-[12px]">
            <h1 className="text-lg font-bold">To Do</h1>
            <div className="bg-gray_EEEEEE rounded-[4px] px-[6px] py-[3px] text-xs text-gray_787486">
              3
            </div>
          </div>
        </div>
        <button>
          <Image src={settingIcon} alt="컬럼 관리" width={22} height={22} />
        </button>
      </div>
      <div className="mb-[10px]">
        <AddButton mode="todo" />
      </div>
      <div className="mb-[24px]">
        <ColumnCard />
      </div>
      <div className="border-b border-gray_EEEEEE"></div>
    </div>
  );
}
