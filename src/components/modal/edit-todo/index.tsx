"use client";

import { ModalButton } from "@/components/common/button";
import { AssigneeDropdown } from "@/components/Dropdown/AssigneeDropdown";
import { ProgressDropdown } from "@/components/Dropdown/ProgressDropdown";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import editIcon from "@/assets/edit_icon.svg";

export function ModalEditTodo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={true} onClose={setIsOpen}>
      <div className="fixed inset-0 bg-black bg-opacity-30">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white_FFFFFF min-w-[327px] w-full pt-[28px] px-[20px] pb-[20px] rounded-[16px] md:w-[584px]">
            <h1 className="text-lg text-black_333236 mb-[32px] font-bold md:text-2xl">
              할 일 생성
            </h1>
            <div className="flex flex-col gap-y-[32px]">
              <div className="flex flex-col gap-y-[32px] md:flex-row md:gap-x-[32px]">
                <div className="flex flex-col gap-y-[8px] md:flex-1">
                  <span>상태</span>
                  <ProgressDropdown />
                </div>
                <div className="flex flex-col gap-y-[8px] md:flex-1">
                  <span className="text-lg text-black_333236">담당자</span>
                  <AssigneeDropdown />
                </div>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <span className="text-lg text-black_333236">제목 *</span>
                <input className="px-[16px] py-[11px] rounded-[8px] border border-gray_D9D9D9" />
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <span className="text-lg text-black_333236">설명 *</span>
                <textarea className="px-[16px] py-[11px] rounded-[8px] border border-gray_D9D9D9 resize-none" />
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <span className="text-lg text-black_333236">마감일</span>
                <input
                  type="date"
                  className="px-[16px] py-[11px] rounded-[6px] border border-gray_D9D9D9"
                />
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <span className="text-lg text-black_333236">태그</span>
                <input className="px-[16px] py-[11px] rounded-[6px] border border-gray_D9D9D9" />
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <span className="text-lg text-black_333236">이미지</span>
                <input type="file" />
              </div>
              <div className="flex gap-x-[11px]">
                <ModalButton mode="cancel">취소</ModalButton>
                <ModalButton mode="any">수정</ModalButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
