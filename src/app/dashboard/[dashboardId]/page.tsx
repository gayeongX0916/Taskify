"use client";

import ColumnCard from "@/components/Card/Column";
import AddButton from "@/components/common/Button/AddButton";
import { Spinner } from "@/components/common/Spinner";
import { CreateColumnModal } from "@/components/Modal/CreateColumn";
import { getColumnList } from "@/lib/api/columns";
import { useColumnStore } from "@/lib/stores/column";
import { useLoadingStore } from "@/lib/stores/loading";
import { useToastStore } from "@/lib/stores/toast";
import { isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const dashboardPage = () => {
  const addToast = useToastStore.getState().addToast;
  const { dashboardId } = useParams();
  const dashboardIdNum = Number(dashboardId);
  const key = "dashboard";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? true);
  const [isOpen, setIsOpen] = useState(false);
  const columnsByDashboard = useColumnStore(
    (state) => state.columnsByDashboard?.[dashboardIdNum]
  );
  const columnArray = columnsByDashboard
    ? Object.values(columnsByDashboard)
    : [];
  const setColumnList = useColumnStore((state) => state.setColumnList);

  const handleOpen = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        start(key);
        const res = await getColumnList({ dashboardId: dashboardIdNum });
        setColumnList(dashboardIdNum, res.data.data);
      } catch (error) {
        if (isAxiosError(error)) {
          addToast(
            error.response?.data.message || "컬럼 목록 조회에 실패했습니다."
          );
        } else {
          addToast("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        stop(key);
      }
    };
    fetchData();
  }, [dashboardIdNum, start, stop, setColumnList, addToast]);

  return (
    <main className="bg-gray_FAFAFA min-h-screen">
      <CreateColumnModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex flex-col pb-[20px] lg:flex-row lg:overflow-x-auto">
        <div className="flex flex-col lg:flex-row w-full">
          {isLoading ? (
            <div className="flex w-full justify-center pt-[100px]">
              <Spinner />
            </div>
          ) : (
            columnArray.map(({ id, title }) => (
              <ColumnCard key={id} columnId={id} title={title} />
            ))
          )}
        </div>

        {!isLoading && (
          <div className="px-[12px] pt-[16px] pb-[49px] md:py-[20px] md:px-[20px] lg:pt-[68px] lg:pb[0] lg:pl-[20px] lg:pr-[100px]">
            <AddButton
              mode="column"
              className="w-full font-bold py-[20px] lg:w-[354px]"
              onClick={handleOpen}
              disabled={isLoading}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default dashboardPage;
