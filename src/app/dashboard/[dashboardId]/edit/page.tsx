"use client";

import Image from "next/image";
import arrowLeft from "@/assets/arrow_left.svg";
import { useParams, useRouter } from "next/navigation";
import { EditDashboardCard } from "@/components/Card/EditDashboard";
import { MemberOrInviteTable } from "@/components/Table/MemberOrInvite";
import { AddButton } from "@/components/common/Button/AddButton";
import { useDashboardStore } from "@/lib/stores/dashboard";
import { deleteDashboard, getInviteDashboard } from "@/lib/api/dashboards";
import { useToastStore } from "@/lib/stores/toast";
import { useLoadingStore } from "@/lib/stores/loading";

const editDashboardPage = () => {
  const addToast = useToastStore.getState().addToast;
  const router = useRouter();
  const { dashboardId } = useParams();
  const dashboardIdNum = Number(dashboardId);
  const { isLoading, startLoading, stopLoading } = useLoadingStore();
  const removeDashboard = useDashboardStore((state) => state.removeDashboard);

  const handleDeleteDashboard = async (dashboardId: number) => {
    try {
      startLoading();
      await deleteDashboard({ dashboardId });
      removeDashboard(dashboardId);
      addToast("대시보드를 성공적으로 삭제했습니다.");
      router.push("/mydashboard");
    } catch (error) {
      addToast("대시보드 삭제에 실패했습니다.");
    } finally {
      stopLoading();
    }
  };

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
          <EditDashboardCard dashboardId={dashboardIdNum} />
          <MemberOrInviteTable mode="member" dashboardId={dashboardIdNum} />
          <MemberOrInviteTable mode="invite" dashboardId={dashboardIdNum} />
        </div>
      </div>
      <div className="mt-[24px] md:flex md:justify-start">
        <AddButton
          mode="delete"
          className="w-full py-[13px] md:w-[320px] md:py-[18px]"
          onClick={() => handleDeleteDashboard(dashboardIdNum)}
          disabled={isLoading}
        />
      </div>
    </main>
  );
};

export default editDashboardPage;
