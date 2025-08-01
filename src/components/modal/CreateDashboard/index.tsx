"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import checkIcon from "@/assets/white_check_icon.svg";
import Image from "next/image";
import { ModalButton } from "@/components/common/Button/ModalButton";
import { colorList } from "@/lib/utils/dashboardColor";
import { ModalProps } from "@/types/ModalProps";

export function CreateDashboardModal({ isOpen, onClose }: ModalProps) {
  const [color, setColor] = useState("");
  const [name, setName] = useState("");

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
        <section className="bg-white_FFFFFF px-[16px] py-[20px] rounded-[8px] w-full min-w-[327px] md:w-[584px] md:px-[32px] md:py-[32px]">
          <h1 className="text-xl text-black_333236 mb-[24px] font-bold md:text-2xl">
            새로운 대시보드
          </h1>

          <form>
            <div className="flex flex-col gap-y-[8px] mb-[16px]">
              <label
                htmlFor="dashboard-name"
                className="text-lg text-black_333236"
              >
                대시보드 이름
              </label>
              <input
                id="dashboard-name"
                className="px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9 w-full h-[50px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex gap-x-[8px]">
              {colorList.map((list) => (
                <button
                  key={list}
                  type="button"
                  onClick={() => setColor(list)}
                  className={`bg-${list} w-[30px] h-[30px] rounded-full flex justify-center items-center`}
                >
                  {color === list && <Image src={checkIcon} alt="체크" />}
                </button>
              ))}
            </div>

            <footer className="flex gap-x-[7px] mt-[32px] md:mt-[40px]">
              <ModalButton mode="cancel" onClick={onClose}>
                취소
              </ModalButton>
              <ModalButton mode="any">생성</ModalButton>
            </footer>
          </form>
        </section>
      </div>
    </Dialog>
  );
}
