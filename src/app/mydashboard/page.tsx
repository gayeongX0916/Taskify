"use client";

import { DashboardNameCard } from "@/components/Card/DashboardName";
import { AddButton } from "@/components/common/Button/AddButton";
import { PaginationButton } from "@/components/common/Button/PaginationButton";
import { CreateDashboardModal } from "@/components/Modal/CreateDashboard";
import { ReceivedInviteTable } from "@/components/Table/ReceivedInvite";
import { getDashboardList } from "@/lib/api/dashboards";
import { useEffect, useState } from "react";

const mydashboardPage = () => {
  const [dashboardList, setDashboardLit] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardList();
        setDashboardLit(res.data.dashboards);
      } catch (error: any) {
        setError("대시보드를 불러오는 중 오류가 발생했습니다.");
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
              className="w-full py-[15px]"
              onClick={() => setIsOpen(true)}
            />
            {dashboardList.length > 0 &&
              dashboardList.map((dashboard) => (
                <DashboardNameCard
                  name="비브리지"
                  isOwner={true}
                  bgColor="green"
                />
              ))}
            {/* <DashboardNameCard name="비브리지" isOwner={true} bgColor="green" />
            <DashboardNameCard name="비브리지" isOwner={false} bgColor="pink" />
            <DashboardNameCard name="비브리지" isOwner={true} bgColor="blue" />
            <DashboardNameCard name="ds" isOwner={false} bgColor="blue" /> */}
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
