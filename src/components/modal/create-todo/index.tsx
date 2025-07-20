"use client";

import { ModalButton } from "@/components/common/button";
import { AssigneeDropdown } from "@/components/dropdown/assignee";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import plusIcon from "@/assets/plus_icon.svg";
import { useRef, useState } from "react";

export function ModalCreateTodo() {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={true} onClose={setIsOpen}>
      <div className="fixed inset-0 bg-black bg-opacity-30">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white_FFFFFF min-w-[327px] w-full pt-[28px] px-[20px] pb-[20px] rounded-[16px] md:w-[584px]">
            <h1 className="text-lg text-black_333236 mb-[32px] font-bold md:text-2xl">
              할 일 생성
            </h1>
            <div className="flex flex-col gap-y-[24px]">
              <div className="flex flex-col gap-y-[8px]">
                <span className="text-lg text-black_333236">담당자</span>
                <AssigneeDropdown />
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <span className="text-lg text-black_333236">제목 *</span>
                <input
                  className="px-[16px] py-[11px] rounded-[8px] border border-gray_D9D9D9"
                  placeholder="제목을 입력해 주세요"
                />
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <span className="text-lg text-black_333236">설명 *</span>
                <textarea
                  placeholder="설명을 입력해 주세요"
                  className="px-[16px] py-[11px] rounded-[8px] border border-gray_D9D9D9 resize-none"
                />
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <span className="text-lg text-black_333236">마감일</span>
                <input
                  type="date"
                  className="px-[16px] py-[11px] rounded-[6px] border border-gray_D9D9D9"
                  placeholder="날짜를 입력해 주세요"
                />
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <span className="text-lg text-black_333236">태그</span>
                <input
                  className="px-[16px] py-[11px] rounded-[6px] border border-gray_D9D9D9"
                  placeholder="입력 후 Enter"
                />
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <span className="text-lg text-black_333236">이미지</span>
                <div className="w-[76px] h-[76px] bg-[#F5F5F5] flex justify-center items-center">
                  <button onClick={handleInputClick}>
                    <Image src={plusIcon} alt="추가" />
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" />
                </div>
              </div>
              <div className="flex gap-x-[11px]">
                <ModalButton mode="cancel">취소</ModalButton>
                <ModalButton mode="any">생성</ModalButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
