"use client";

import { DashboardNameCard } from "@/components/Card/DashboardName";
import { AddButton } from "@/components/common/Button/AddButton";
import { PaginationButton } from "@/components/common/Button/PaginationButton";
import { Skeleton } from "@/components/common/Skeleton";
import { CreateDashboardModal } from "@/components/Modal/CreateDashboard";
import { ReceivedInviteTable } from "@/components/Table/ReceivedInvite";
import { getDashboardList } from "@/lib/api/dashboards";
import { useDashboardStore } from "@/lib/stores/dashboard";
import { useLoadingStore } from "@/lib/stores/loading";
import { useToastStore } from "@/lib/stores/toast";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const mydashboardPage = () => {
  const router = useRouter();
  const addToast = useToastStore.getState().addToast;
  const key = "mydashboard";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const dashboardList = useDashboardStore((state) => state.dashboardsById);
  const setDashboardList = useDashboardStore((state) => state.setDashboardList);
  const dashboardArray = Object.values(dashboardList);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        start(key);
        const res = await getDashboardList();
        setDashboardList(res.data.dashboards);
      } catch (error: any) {
        if (isAxiosError(error)) {
          addToast(
            error.response?.data.message ||
              "대시보드 목록을 불러오는데 실패했습니다."
          );
        } else {
          addToast("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        stop(key);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="bg-gray_FAFAFA min-h-screen">
      <CreateDashboardModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="max-w-[960px] px-[24px] py-[24px] flex flex-col gap-y-[32px] md:gap-y-[40px] md:px-[40px] md:py-[40px]">
        <div className="flex flex-col gap-y-[16px] lg:gap-y-[12px]">
          <div className="flex flex-col gap-y-[8px] md:grid md:grid-cols-2 md:gap-[10px] lg:grid-cols-3 lg:gap-[12px]">
            <AddButton
              mode="dashboard"
              className="w-full h-[70px]"
              onClick={() => setIsOpen(true)}
              disabled={isLoading}
            />
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton className="w-full h-[70px]" key={i} />
                ))
              : dashboardArray.map(({ id }) => (
                  <div key={id} onClick={() => router.push(`/dashboard/${id}`)}>
                    <DashboardNameCard dashboardId={id} />
                  </div>
                ))}
          </div>
          {dashboardArray.length > 0 && (
            <div className="flex items-center justify-end gap-x-[16px]">
              <span className="text-xs text-black_333236 md:text-md">
                1 페이지 중 1
              </span>
              <PaginationButton />
            </div>
          )}
        </div>

        <ReceivedInviteTable />
      </div>
    </main>
  );
};

export default mydashboardPage;
