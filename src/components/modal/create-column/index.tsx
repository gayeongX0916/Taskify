"use client";

import { ModalButton } from "@/components/common/button";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

export function ModalCreateColumn() {
  const [isOpen, setIsOpen] = useState(false);
  const [existed, setExisted] = useState(true);

  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <div className="fixed inset-0 bg-black bg-opacity-30">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white_FFFFFF px-[16px] py-[24px] rounded-[8px] min-w-[327px] md:w-[568px] w-full">
            <h1 className="text-xl text-black_333236 font-bold mb-[16px]">
              새 컬럼 생성
            </h1>
            <div className="flex flex-col gap-y-[8px] mb-[24px]">
              <span className="text-lg text-black_333236">이름</span>
              <input
                className={`px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9 ${
                  existed ? "border-red_D6173A" : ""
                }`}
              />
              {existed && (
                <span className="text-md text-red_D6173A">
                  중복된 컬럼 이름입니다.
                </span>
              )}
            </div>
            <div className="flex gap-x-[7px]">
              <ModalButton mode="cancel">취소</ModalButton>
              <ModalButton mode="any">생성</ModalButton>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
