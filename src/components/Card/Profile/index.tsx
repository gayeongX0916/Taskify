"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import plusIcon from "@/assets/plus_icon.svg";
import { BaseInput } from "@/components/common/Input/BaseInput";
import { ModalButton } from "@/components/common/Button/ModalButton";

export function ProfileCard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [emailValue, setEmailValue] = useState("kim@naver.com");
  const [nicknameValue, setNicknameValue] = useState("배김김");

  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="bg-white_FFFFFF px-[16px] py-[16px] rounded-[8px] md:px-[24px] md:py-[24px] md:rounded-[16px]">
      <h1 className="text-2lg text-black_333236 font-bold mb-[40px] md:text-xl md:mb-[24px]">
        프로필
      </h1>

      <form className="flex flex-col gap-y-[40px] md:flex-row md:gap-x-[42px]">
        <button
          className="w-[100px] h-[100px] flex justify-center items-center bg-[#F5F5F5] rounded-[6px] md:w-[182px] md:h-[182px]"
          onClick={handleInputClick}
        >
          <Image
            src={plusIcon}
            alt="더하기"
            width={20}
            height={20}
            className="md:w-[30px] md:h-[30px]"
          />
        </button>

        <input type="file" ref={fileInputRef} className="hidden" />

        <div className="flex flex-col gap-y-[24px] flex-[9]">
          <div className="flex flex-col gap-y-[16px]">
            <BaseInput
              label="이메일"
              value={emailValue}
              onChange={setEmailValue}
              mode="profile"
            />
            <BaseInput
              label="닉네임"
              value={nicknameValue}
              onChange={setNicknameValue}
              mode="profile"
            />
          </div>

          <ModalButton mode="any">저장</ModalButton>
        </div>
      </form>
    </section>
  );
}
