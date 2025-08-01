"use client";

import Image from "next/image";
import arrowLeft from "@/assets/arrow_left.svg";
import { useRouter } from "next/navigation";
import { EditDashboardCard } from "@/components/Card/EditDashboard";
import { MemberOrInviteTable } from "@/components/Table/MemberOrInvite";
import { AddButton } from "@/components/common/Button/AddButton";

const editDashboardPage = () => {
  const router = useRouter();

  return (
    <main className="bg-gray_FAFAFA pt-[16px] px-[12px] pb-[60px] md:px-[20px] md:pt-[20px]">
      <div className="flex flex-col gap-y-[6px] md:gap-y-[29px] max-w-[670px]">
        <button
          className="flex items-center gap-x-[8px]"
          onClick={() => router.back()}
        >
          <Image src={arrowLeft} alt="돌아가기" />
          <span className="text-lg text-black_333236">돌아가기</span>
        </button>

        <div className="flex flex-col gap-y-[16px]">
          <EditDashboardCard title="비브리지" />
          <MemberOrInviteTable mode="member" />
          <MemberOrInviteTable mode="invite" />
        </div>
      </div>
      <div className="mt-[24px] md:flex md:justify-start">
        <AddButton
          mode="delete"
          className="w-full py-[13px] md:w-[320px] md:py-[18px]"
        />
      </div>
    </main>
  );
};

export default editDashboardPage;
