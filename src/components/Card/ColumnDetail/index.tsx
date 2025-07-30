"use client";

import exampleIcon from "@/assets/crown.svg";
import Image from "next/image";
import calendarIcon from "@/assets/calendar_icon.svg";
import { useState } from "react";
import { Avatar } from "@/components/common/Avatar";
import { TagList } from "@/components/common/TagList";

function CalendarDate({ className }: { className?: string }) {
  return (
    <time className={`flex gap-x-[4px] items-center ${className}`}>
      <Image src={calendarIcon} alt="달력" />
      <span className="text-xs text-gray_787486">2022.12.31</span>
    </time>
  );
}

export function ColumnDetailCard() {
  const exampleList = ["프로젝트", "일반", "백엔드"];
  const [image, setImage] = useState(true);

  return (
    <article
      className={`rounded-[6px] px-[12px] pb-[5px] bg-white_FFFFFF border border-D9D9D9 flex flex-col gap-y-[4px] md:flex-row md:gap-x-[20px] md:px-[20px] lg:flex-col lg:gap-y-[16px]  ${
        image ? "pt-[12px] md:py-[16px]" : "pt-[5px] md:py-[14px] lg:py-[16px]"
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

      <section className="flex flex-col gap-y-[6px] md:gap-y-[10px] md:flex-[9]">
        <header>
          <h3 className="text-md md:text-lg text-black_333236">
            새로운 일정 관리 Taskify
          </h3>
        </header>

        <div className="flex flex-col gap-y-[6px] md:flex-row md:gap-x-[18px] md:w-full md:justify-between lg:flex-col">
          <div className="flex md:gap-x-[16px] md:items-center">
            <TagList tags={exampleList} />

            <CalendarDate className="hidden md:flex lg:hidden" />
          </div>

          <div className="flex justify-between items-center">
            <CalendarDate className="md:hidden lg:flex" />
            <Avatar username="배유철" />
          </div>
          
        </div>
      </section>
    </article>
  );
}
