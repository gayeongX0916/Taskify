"use client";

import { ModalButton } from "@/components/common/button";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

export function ModalDeleteColumn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={true} onClose={setIsOpen}>
      <div className="fixed inset-0 bg-black bg-opacity-30">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white_FFFFFF px-[16px] py-[24px] rounded-[16px] min-w-[327px] w-full md:w-[568px] flex flex-col gap-y-[32px] md:gap-y-[40px]">
            <span className="text-lg text-black_333236 md:text-xl text-center">
              컬럼의 모든 카드가 삭제됩니다.
            </span>
            <div className="flex gap-x-[7px]">
              <ModalButton mode="cancel" onClick={() => setIsOpen(false)}>
                취소
              </ModalButton>
              <ModalButton mode="any">삭제</ModalButton>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
