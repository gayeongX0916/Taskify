"use client";

import { useParams, useRouter } from "next/navigation";
import { EditDashboardCard } from "@/components/Card/EditDashboard";
import { MemberOrInviteTable } from "@/components/Table/MemberOrInvite";
import AddButton from "@/components/common/Button/AddButton";
import { useDashboardStore } from "@/lib/stores/dashboard";
import { deleteDashboard } from "@/lib/api/dashboards";
import { useLoadingStore } from "@/lib/stores/loading";
import { BackButton } from "@/components/common/Button/BackButton";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

const EditDashboardPage = () => {
  const router = useRouter();
  const { dashboardId } = useParams();
  const dashboardIdNum = Number(dashboardId);
  const key = "edit";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const removeDashboard = useDashboardStore((s) => s.removeDashboard);

  const handleDeleteDashboard = async (dashboardId: number) => {
    try {
      start(key);
      await deleteDashboard({ dashboardId });
      removeDashboard(dashboardId);
      toast.success("대시보드를 성공적으로 삭제했습니다.");
      router.push("/mydashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "대시보드 삭제에 실패했습니다."
        );
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  };

  return (
    <main className="bg-gray_FAFAFA pt-[16px] px-[12px] pb-[60px] md:px-[20px] md:pt-[20px]">
      <div className="flex flex-col gap-y-[6px] md:gap-y-[29px] max-w-[670px]">
        <BackButton isLoading={isLoading} />

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

export default EditDashboardPage;
