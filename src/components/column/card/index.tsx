"use client";

import exampleIcon from "@/assets/crown.svg";
import Image from "next/image";
import calendarIcon from "@/assets/calendar_icon.svg";
import { useState } from "react";

function CalendarDate({ className }: { className?: string }) {
  return (
    <div className={`flex gap-x-[4px] items-center ${className}`}>
      <Image src={calendarIcon} alt="달력" />
      <span className="text-xs text-gray_787486">2022.12.31</span>
    </div>
  );
}

export function ColumnCard() {
  const exampleList = ["프로젝트", "일반", "백엔드"];
  const [image, setImage] = useState(true);

  return (
    <div
      className={`rounded-[6px] px-[12px] pb-[5px] bg-white_FFFFFF border border-D9D9D9 flex flex-col gap-y-[4px] md:flex-row md:gap-x-[20px] md:px-[20px] md:py-[14px] lg:flex-col  ${
        image ? "pt-[12px]" : "pt-[5px]"
      } `}
    >
      {image && (
        <div className="flex justify-center items-center">
          <Image
            src={exampleIcon}
            alt="예시"
            width={260}
            height={150}
            className="md:w-[90px] md:h-[53px] lg:w-[274px] lg:h-[160px]"
          />
        </div>
      )}

      <div className="flex flex-col gap-y-[6px] md:gap-y-[10px] md:flex-[9]">
        <span className="text-md text-black_333236 md:text-lg">
          새로운 일정 관리 Taskify
        </span>

        <div className="flex flex-col gap-y-[6px] md:flex-row md:gap-x-[18px] md:w-full md:justify-between lg:flex-col">
          
          <div className="md:flex gap-x-[16px] items-center">
            <div className="flex gap-x-[6px]">
              {exampleList.map((list) => (
                <span key={list}>{list}</span>
              ))}
            </div>

            <CalendarDate className="hidden md:flex lg:hidden" />
          </div>

          <div className="flex justify-between">
            <CalendarDate className="md:hidden lg:flex" />
            <div className="rounded-full flex justify-center items-center w-[22px] h-[22px] font-bold bg-[#A3C4A2]">
              B
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
