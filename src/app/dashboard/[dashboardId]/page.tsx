"use client";

import { ColumnCard } from "@/components/Card/Column";
import { AddButton } from "@/components/common/Button/AddButton";
import { CreateColumnModal } from "@/components/Modal/CreateColumn";
import { getColumnList } from "@/lib/api/columns";
import { useColumnStore } from "@/lib/stores/column";
import { useToastStore } from "@/lib/stores/toast";
import { getColumnListType } from "@/types/columns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const dashboardPage = () => {
  const addToast = useToastStore.getState().addToast;
  const [isOpen, setIsOpen] = useState(false);
  const { dashboardId } = useParams();
  const columnList = useColumnStore((state) => state.columnsById);
  const columnArray = Object.values(columnList);
  const setColumnList = useColumnStore((state) => state.setColumnList);
  // const {isLoading,startLoading,stopLoading}=useLoadingStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getColumnList({ dashboardId: Number(dashboardId) });
        setColumnList(res.data.data);
      } catch (error) {
        addToast("컬럼 목록 조회에 실패했습니다.");
      }
    };
    fetchData();
  }, []);

  return (
    <main className="bg-gray_FAFAFA min-h-screen">
      <CreateColumnModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex flex-col pb-[20px] lg:flex-row lg:overflow-x-auto">
        <div className="flex flex-col lg:flex-row">
          {columnArray.map(({ id, title }) => (
            <ColumnCard key={id} columnId={id} title={title} />
          ))}
        </div>
        <div className="px-[12px] pt-[16px] pb-[49px] md:py-[20px] md:px-[20px] lg:pt-[68px] lg:pb[0] lg:pl-[20px] lg:pr-[100px]">
          <AddButton
            mode="column"
            className="w-full font-bold py-[20px] lg:w-[354px]"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
    </main>
  );
};

export default dashboardPage;
