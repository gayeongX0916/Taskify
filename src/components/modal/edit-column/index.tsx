"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import closeIcon from "@/assets/close_icon_gray.svg";
import Image from "next/image";
import { ModalButton } from "@/components/common/button";

export function ModalEditColumn() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <div className="fixed inset-0 bg-black bg-opacity-30">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white_FFFFFF px-[16px] py-[24px] rounded-[8px] min-w-[327px] w-full md:w-[568px]">
            <div className="flex justify-between items-center mb-[16px]">
              <h1 className="text-xl font-bold text-black_333236">컬럼 관리</h1>
              <button onClick={() => setIsOpen(false)}>
                <Image src={closeIcon} alt="닫기" />
              </button>
            </div>
            <div className="flex flex-col gap-y-[8px] mb-[24px]">
              <span className="text-lg text-black_333236">이름</span>
              <input className="px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9" />
            </div>
            <div className="flex gap-x-[7px]">
              <ModalButton mode="cancel">삭제</ModalButton>
              <ModalButton mode="any">변경</ModalButton>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
