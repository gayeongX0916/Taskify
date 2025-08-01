"use client";

import arrowLeft from "@/assets/arrow_left.svg";
import { PasswordCard } from "@/components/Card/Password";
import { ProfileCard } from "@/components/Card/Profile";
import Image from "next/image";
import { useRouter } from "next/navigation";

const myPage = () => {
  const router = useRouter();

  return (
    <main className="bg-gray_FAFAFA pt-[16px] px-[12px] pb-[60px] md:px-[16px]">
      <div className="flex flex-col gap-y-[6px] md:gap-y-[29px] max-w-[670px]">
        <button
          className="flex items-center gap-x-[8px]"
          onClick={() => router.back()}
        >
          <Image src={arrowLeft} alt="돌아가기" />
          <span className="text-lg text-black_333236">돌아가기</span>
        </button>
        <ProfileCard />
        <PasswordCard />
      </div>
    </main>
  );
};

export default myPage;
