"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import moreIcon from "@/assets/more_icon.svg";
import closeIcon from "@/assets/close_icon.svg";
import Image from "next/image";
import { Chip } from "@/components/common/Chip";
import { CommentTextarea } from "@/components/common/Input/CommentTextarea";
import { Comment } from "@/components/Comment";
import { AssigneeCard } from "@/components/dashboard/AssigneeCard";
import { ActionDropdown } from "@/components/Dropdown/ActionDropdown";
import { ModalProps } from "@/types/ModalProps";
import { getTagColor } from "@/utils/getTagColor";

export function DashBoardModal({ isOpen, onClose }: ModalProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const exampleList = ["백엔드", "프론트엔드", "디자인"];
  const commentList = [
    { name: "정만철", date: "2025-11-23 14:00", des: "언제까지?" },
    { name: "정만철", date: "2025-11-23 14:00", des: "언제까지?" },
    { name: "정만철", date: "2025-11-23 14:00", des: "언제까지?" },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
        <section className="bg-white_FFFFFF w-full md:w-[730px] px-[16px] py-[16px] md:pt-[30px] md:pr-[38px] md:pb-[33px] md:pl-[18px] rounded-[8px]">
          
          <header className="flex justify-end md:justify-between items-center mb-[16px] md:mb-[24px]">
            <h2 className="hidden md:block md:text-2xl md:text-black_333236 md:font-bold">
              대시보드 타이틀
            </h2>

            <div className="flex gap-x-[16px] md:gap-x-[24px] relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown((prev) => !prev);
                }}
              >
                <Image
                  src={moreIcon}
                  alt="더보기"
                  width={24}
                  height={24}
                  className="md:w-[28px] md:h-[28px]"
                />
              </button>
              <button onClick={onClose}>
                <Image
                  src={closeIcon}
                  alt="닫기"
                  width={24}
                  height={24}
                  className="md:w-[28px] md:h-[28px]"
                />
              </button>
              {showDropdown && (
                <div className="absolute right-[50px] top-full mt-[8px] z-10">
                  <ActionDropdown setShowDropdown={setShowDropdown} />
                </div>
              )}
            </div>

          </header>

          <h2 className="text-xl text-black_333236 font-bold flex justify-start mb-[8px] md:hidden">
            새로운 일정 관리 Taskify
          </h2>

          <main className="flex flex-col-reverse md:flex-row md:justify-between max-h-[70vh] overflow-y-auto pr-[20px]">
            <article className="flex flex-col">
              <div className="flex gap-x-[12px] items-center md:gap-x-[20px]">
                <Chip name="To Do" className="text-xs"/>
                <span className="border-l border-gray_D9D9D9 h-[20px]" />
                <div className="flex items-center gap-x-[8px] md:gap-x-[6px]">
                  {exampleList.map((item) => {
                    const color = getTagColor(item);
                    return (
                      <span
                        key={item}
                        className={
                          "rounded-[4px] px-[6px] py-[4px] md:px-[9px] md:py-[5px] text-xs"
                        }
                        style={{ backgroundColor: color.bg, color: color.text }}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>

              <p className="text-md mt-[16px] lg:mt-[26px]">내용들</p>

              <Image
                src={moreIcon}
                alt="예시"
                width={290}
                height={168}
                className="w-full h-full mt-[32px] md:mt-[16px] lg:mt-[8px] md:w-[420px] md:h-[246px] lg:w-[445px] lg:h-[260px]"
              />

              <div className="mt-[24px] lg:mt-[16px]">
                <CommentTextarea />
              </div>

              <div className="mt-[16px] md:mt-[24px] flex flex-col gap-y-[8px]">
                {commentList.map(({ name, date, des }) => (
                  <Comment name={name} date={date} des={des} />
                ))}
              </div>
            </article>

            <AssigneeCard name="배유철" />
          </main>
        </section>
      </div>
    </Dialog>
  );
}
