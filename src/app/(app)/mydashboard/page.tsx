"use client";

import DashboardNameCard from "@/components/Card/DashboardName";
import AddButton from "@/components/common/Button/AddButton";
import PaginationButton from "@/components/common/Button/PaginationButton";
import { Skeleton } from "@/components/common/Skeleton";
import { CreateDashboardModal } from "@/components/Modal/CreateDashboard";
import ReceivedInviteTable from "@/components/Table/ReceivedInvite";
import { getDashboardList } from "@/lib/api/dashboards";
import { useDashboardStore } from "@/lib/stores/dashboard";
import { useLoadingStore } from "@/lib/stores/loading";
import { useToastStore } from "@/lib/stores/toast";
import { getDashboardListType } from "@/types/dashboards";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const mydashboardPage = () => {
  const router = useRouter();
  const addToast = useToastStore.getState().addToast;
  const key = "mydashboard";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const setDashboardList = useDashboardStore((s) => s.setDashboardList);
  const [dashboards, setDashboards] = useState<getDashboardListType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / 5);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        start(key);
        const res = await getDashboardList({ page, size: PAGE_SIZE });
        setDashboardList(res.data.dashboards);
        setDashboards(res.data.dashboards);
        setTotalCount(res.data.totalCount);
      } catch (error) {
        if (isAxiosError(error)) {
          addToast(
            error.response?.data.message ||
              "대시보드 목록 불러오기에 실패했습니다."
          );
        } else {
          addToast("알 수 없는 오류 발생");
        }
      } finally {
        stop(key);
      }
    };
    fetchData();
  }, [page, isOpen]);

  const filledArray = useMemo(
    () =>
      Array.from({ length: PAGE_SIZE }).map(
        (_, i) => dashboards[i] || { id: `empty-${i}`, isEmpty: true }
      ),
    [dashboards]
  );

  const handleOpenCreateDashboard = useCallback(() => setIsOpen(true), []);

  return (
    <main className="bg-gray_FAFAFA min-h-screen">
      <CreateDashboardModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="max-w-[960px] px-[24px] py-[24px] flex flex-col gap-y-[32px] md:gap-y-[40px] md:px-[40px] md:py-[40px]">
        <div className="flex flex-col gap-y-[16px] lg:gap-y-[12px]">
          <div className="flex flex-col gap-y-[8px] md:grid md:grid-cols-2 md:gap-[10px] lg:grid-cols-3 lg:gap-[12px]">
            <AddButton
              mode="dashboard"
              className="w-full h-[61px] lg:h-[70px]"
              onClick={handleOpenCreateDashboard}
              disabled={isLoading}
            />

            {filledArray.map(({ id, isEmpty }) => (
              <div key={id} className="relative w-full h-[61px] lg:h-[70px]">
                {!isEmpty && (
                  <div onClick={() => router.push(`/dashboard/${id}`)}>
                    <DashboardNameCard dashboardId={Number(id)} />
                  </div>
                )}
                {isLoading && <Skeleton className="absolute inset-0" />}
              </div>
            ))}
          </div>

          {totalCount > 0 && (
            <div className="flex items-center justify-end gap-x-[16px]">
              <span className="text-xs text-black_333236 md:text-md">
                {totalPages} 페이지 중 {page}
              </span>
              <PaginationButton
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>

        <ReceivedInviteTable />
      </div>
    </main>
  );
};

export default mydashboardPage;
