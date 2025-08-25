"use client";

import arrowLeft from "@/assets/arrow_left.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function BackButton({ isLoading }: { isLoading?: boolean }) {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-x-[8px]"
      onClick={() => router.back()}
      disabled={isLoading}
    >
      <Image src={arrowLeft} alt="돌아가기" />
      <span className="text-lg text-black_333236">돌아가기</span>
    </button>
  );
}
