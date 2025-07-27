"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import moreIcon from "@/assets/more_icon.svg";
import closeIcon from "@/assets/close_icon.svg";
import Image from "next/image";
import { Chip } from "@/components/common/Chip";
import { CommentTextarea } from "@/components/common/Input/CommentTextarea";
import { Comment } from "@/components/comment";
import { AssigneeCard } from "@/components/dashboard/assignee-card";
import { Dropdown } from "@/components/Dropdown/ActionDropdown";

export function ModalDashBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const exampleList = ["백엔드", "프론트엔드", "디자인"];

  return (
    <Dialog open={isOpen} onClose={setIsOpen} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white_FFFFFF w-full md:w-[730px] px-[16px] py-[16px] md:pt-[30px] md:pr-[38px] md:pb-[33px] md:pl-[18px] rounded-[8px]">
          <div className="flex justify-end md:justify-between items-center mb-[16px] md:mb-[24px]">
            <h2 className="hidden md:block md:text-2xl md:text-black_333236 md:font-bold">
              새로운 일정 관리 Taskify
            </h2>
            <div className="flex gap-x-[16px] md:gap-x-[24px] relative">
              <button onClick={() => setShowDropdown((prev) => !prev)}>
                <Image
                  src={moreIcon}
                  alt="더보기"
                  width={24}
                  height={24}
                  className="md:w-[28px] md:h-[28px]"
                />
              </button>
              <button onClick={() => setIsOpen(false)}>
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
                  <Dropdown setShowDropdown={setShowDropdown} />
                </div>
              )}
            </div>
          </div>
          <h2 className="text-xl text-black_333236 font-bold flex justify-start mb-[8px] md:hidden">
            새로운 일정 관리 Taskify
          </h2>

          <div className="flex flex-col-reverse md:flex-row md:justify-between">
            <div>
              <div className="flex gap-x-[20px]">
                <Chip list="To Do" />
                <div className="border-l border-gray_D9D9D9"></div>
                <div className="flex items-center gap-x-[6px]">
                  {exampleList.map((list) => (
                    <span key={list} className="bg-violet_8P">
                      {list}
                    </span>
                  ))}
                </div>
              </div>

              <span className="text-md mt-[16px] lg:mt-[26px] block">
                내용들
              </span>

              <Image
                src={moreIcon}
                alt="예시"
                width={290}
                height={168}
                className="mt-[32px] md:mt-[16px] lg:mt-[8px] md:w-[420px] md:h-[246px] lg:w-[445px] lg:h-[260px]"
              />
              <div className="mt-[24px] mt-[16px] flex flex-col gap-y-[24px]">
                <CommentTextarea />
                <Comment />
              </div>
            </div>
            <AssigneeCard />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
