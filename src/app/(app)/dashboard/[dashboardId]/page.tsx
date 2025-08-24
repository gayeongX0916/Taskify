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
import { useCallback, useEffect, useMemo, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useCardStore } from "@/lib/stores/card";
import { putCard } from "@/lib/api/cards";
import { BaseCardType } from "@/types/cards";

const DashboardPage = () => {
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
  const columnArray = useMemo(
    () => (columnsByDashboard ? Object.values(columnsByDashboard) : []),
    [columnsByDashboard]
  );
  const setColumnList = useColumnStore((s) => s.setColumnList);

  const rawCardsByDashboard = useCardStore(
    (s) => s.cardsByDashboard?.[dashboardIdNum]
  );
  const cardsByDashboard = useMemo(
    () => rawCardsByDashboard ?? {},
    [rawCardsByDashboard]
  );
  const setCardList = useCardStore((s) => s.setCardList);
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
  }, [dashboardIdNum, setColumnList, addToast, start, stop]);

  const parseDroppableId = (droppableId: string) =>
    Number(droppableId.replace("column-", ""));

  const reorder = <T,>(
    list: T[],
    startIndex: number,
    endIndex: number
  ): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { destination, source, draggableId } = result;
      if (!destination) return;

      const sourceColumnId = parseDroppableId(source.droppableId); // 원본 컬럼 ID
      const destColumnId = parseDroppableId(destination.droppableId); // 이동 컬럼 ID
      const cardId = Number(draggableId.replace("card-", "")); // 카드 ID

      const sourceList = Array.from(cardsByDashboard[sourceColumnId] ?? []);
      const destList =
        sourceColumnId === destColumnId
          ? sourceList
          : Array.from(cardsByDashboard[destColumnId] ?? []);

      // 같은 컬럼 내 순서 변경
      if (sourceColumnId === destColumnId) {
        const newOrdered = reorder(sourceList, source.index, destination.index);
        setCardList(
          dashboardIdNum,
          sourceColumnId,
          newOrdered,
          newOrdered.length
        );
        return;
      }

      // 다른 컬럼으로 이동
      const prevSource = [...sourceList];
      const prevDest = [...destList];

      const [moved] = sourceList.splice(source.index, 1);
      const movedCard = { ...moved, columnId: destColumnId };
      destList.splice(destination.index, 0, movedCard);

      // 낙관적 업데이트
      setCardList(
        dashboardIdNum,
        sourceColumnId,
        sourceList,
        sourceList.length
      );
      setCardList(dashboardIdNum, destColumnId, destList, destList.length);

      try {
        const payload: BaseCardType = {
          assigneeUserId: movedCard.assignee.id,
          columnId: destColumnId,
          title: movedCard.title,
          description: movedCard.description,
          dueDate: movedCard.dueDate,
          tags: movedCard.tags,
          imageUrl: movedCard.imageUrl ?? null,
        };
        await putCard({ id: cardId, ...payload });
      } catch {
        addToast("이동 저장 중 오류가 발생했습니다.");
        setCardList(
          dashboardIdNum,
          sourceColumnId,
          prevSource,
          prevSource.length
        );
        setCardList(dashboardIdNum, destColumnId, prevDest, prevDest.length);
      }
    },
    [cardsByDashboard, dashboardIdNum, setCardList, addToast]
  );

  const orderedColumns = useMemo(() => columnArray, [columnArray]);

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
            <DragDropContext onDragEnd={onDragEnd}>
              <>
                {orderedColumns.map(({ id, title }) => (
                  <ColumnCard key={id} columnId={id} title={title} />
                ))}
                <div className="flex-shrink-0 w-[20px]" />
                <div className="px-[12px] pt-[16px] pb-[49px] md:py-[20px] md:px-[20px] lg:pt-[68px] lg:pl-0 lg:pr-[70px]">
                  <AddButton
                    mode="column"
                    className="w-full font-bold py-[20px] lg:w-[354px]"
                    onClick={handleOpen}
                    disabled={isLoading}
                  />
                </div>
              </>
            </DragDropContext>
          )}
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
