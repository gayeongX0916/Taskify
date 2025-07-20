"use client";

import { ModalButton } from "@/components/common/button";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

export function ModalConfirmPassword() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={true} onClose={setIsOpen}>
      <div className="fixed inset-0 bg-black bg-opacity-30">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white_FFFFFF px-[40px] py-[32px] rounded-[16px] min-w-[272px] w-full md:w-[368px] flex flex-col gap-y-[32px]">
            <span className="text-lg text-black_333236 text-center md:text-xl">
              비밀번호가 일치하지 않습니다.
            </span>
            <ModalButton mode="any">확인</ModalButton>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
