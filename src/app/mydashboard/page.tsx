"use client";

import { DashboardNameCard } from "@/components/Card/DashboardName";
import { AddButton } from "@/components/common/Button/AddButton";
import { PaginationButton } from "@/components/common/Button/PaginationButton";
import { CreateDashboardModal } from "@/components/Modal/CreateDashboard";
import { ReceivedInviteTable } from "@/components/Table/ReceivedInvite";
import { getDashboardList } from "@/lib/api/dashboards";
import { useDashboardStore } from "@/lib/stores/dashboard";
import { useLoadingStore } from "@/lib/stores/loading";
import { useToastStore } from "@/lib/stores/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const mydashboardPage = () => {
  const router = useRouter();
  const dashboardList = useDashboardStore((state) => state.dashboardList);
  const setDashboardList = useDashboardStore((state) => state.setDashboardList);
  const [isOpen, setIsOpen] = useState(false);
  const addToast = useToastStore.getState().addToast;
  // const {isLoading,startLoading,stopLoading}=useLoadingStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardList();
        setDashboardList(res.data.dashboards);
      } catch (error: any) {
        addToast("대시보드를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchData();
  }, []);

  // if (dashboardList.length === 0) return <div>로딩 중</div>;

  return (
    <main className="bg-gray_FAFAFA min-h-screen">
      <CreateDashboardModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="max-w-[960px] px-[24px] py-[24px] flex flex-col gap-y-[32px] md:gap-y-[40px] md:px-[40px] md:py-[40px]">
        <div className="flex flex-col gap-y-[16px] lg:gap-y-[12px]">
          <div className="flex flex-col gap-y-[8px] md:grid md:grid-cols-2 md:gap-[10px] lg:grid-cols-3 lg:gap-[12px]">
            <AddButton
              mode="dashboard"
              className="w-full py-[15px]"
              onClick={() => setIsOpen(true)}
            />
            {/* {isLoading ? (
          <div className="py-10 text-center">로딩 중...</div>
        ) : dashboardList.length === 0 ? (
          <div className="py-10 text-center">대시보드가 없습니다.</div>
        ) : (
          dashboardList.map((d) => (
            <DashboardNameCard key={d.id} dashboardId={d.id} />
          ))
        )} */}
            {dashboardList.map(({ id }) => (
              <div key={id} onClick={() => router.push(`/dashboard/${id}`)}>
                <DashboardNameCard dashboardId={id} />
              </div>
            ))}
          </div>
          {dashboardList.length > 0 && (
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
