"use client";

import { ModalButton } from "@/components/common/button";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import checkIcon from "@/assets/white_check_icon.svg";
import Image from "next/image";

export function ModalCreateDashboard() {
  const colorList = [
    "green_7AC555",
    "purple_760DDE",
    "orange_FFA500",
    "blue_76A5EA",
    "pink_E876EA",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [colorClick, setColorClick] = useState("green_7AC555");

  return (
    <Dialog open={true} onClose={setIsOpen}>
      <div className="fixed inset-0 bg-black bg-opacity-30">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white_FFFFFF px-[16px] py-[20px] rounded-[8px] w-full min-w-[327px] md:w-[584px] md:px-[32px] md:py-[32px]">
            <div className="mb-[32px] md:mb-[40px]">
              <h1 className="text-xl text-black_333236 mb-[24px] font-bold md:text-2xl">
                새로운 대시보드
              </h1>
              <div className="flex flex-col gap-y-[8px] mb-[16px]">
                <span className="text-lg text-black_333236">대시보드 이름</span>
                <input className="px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9 w-full h-[50px]" />
              </div>
              <div className="flex gap-x-[8px]">
                {colorList.map((list) => (
                  <button
                    key={list}
                    onClick={() => setColorClick(list)}
                    className={`bg-${list} w-[30px] h-[30px] rounded-full flex justify-center items-center`}
                  >
                    {colorClick === list && (
                      <Image src={checkIcon} alt="체크" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-x-[7px]">
              <ModalButton mode="cancel" onClick={() => setIsOpen(false)}>
                취소
              </ModalButton>
              <ModalButton mode="any">생성</ModalButton>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
