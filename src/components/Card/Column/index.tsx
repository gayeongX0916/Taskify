import Image from "next/image";
import settingIcon from "@/assets/setting_icon.svg";
import AddButton from "@/components/common/Button/AddButton";
import ColumnDetailCard from "../ColumnDetail";
import { EditColumnModal } from "@/components/Modal/Base/EditColumnModal";
import { CreateTodoModal } from "@/components/Modal/CreateTodo";
import DashBoardModal from "@/components/Modal/Dashboard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getCardList } from "@/lib/api/cards";
import { useToastStore } from "@/lib/stores/toast";
import { DeleteColumnModal } from "@/components/Modal/DeleteColumn";
import { useCardStore } from "@/lib/stores/card";
import { useParams } from "next/navigation";
import { isAxiosError } from "axios";
import { useLoadingStore } from "@/lib/stores/loading";
import { Skeleton } from "@/components/common/Skeleton";
import React from "react";

type ColumnCardProps = {
  columnId: number;
  title: string;
};

type ModalName = "editColumn" | "createTodo" | "dashboard" | "deleteColumn";

const SettingIcon = React.memo(({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} aria-label="컬럼 관리">
    <Image
      src={settingIcon}
      alt="컬럼 관리"
      width={22}
      height={22}
      className="md:w-[24px] md:h-[24px]"
    />
  </button>
));
function ColumnCard({ columnId, title }: ColumnCardProps) {
  const { dashboardId } = useParams();
  const dashboardIdNum = Number(dashboardId);
  const key = "columncard";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const addToast = useToastStore.getState().addToast;
  const rawCardList = useCardStore(
    (state) => state.cardsByDashboard?.[dashboardIdNum]?.[columnId]
  );
  const setCardList = useCardStore((state) => state.setCardList);
  const count = useCardStore(
    (state) => state.countsByDashboard?.[dashboardIdNum]?.[columnId] ?? 0
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalState, setModalState] = useState({
    editColumn: false,
    createTodo: false,
    dashboard: false,
    deleteColumn: false,
  });
  const [maxVisible, setMaxVisible] = useState(1);
  const [visibleCount, setVisibleCount] = useState(maxVisible);

  const handleClickOpen = (modalName: ModalName) => {
    setModalState((prev) => ({ ...prev, [modalName]: true }));
  };

  const handleClickClose = (modalName: ModalName) => {
    setModalState((prev) => ({ ...prev, [modalName]: false }));
  };

  const handleOpenEditColumn = useCallback(() => {
    handleClickOpen("editColumn");
  }, []);

  const handleOpenCreateTodo = useCallback(() => {
    handleClickOpen("createTodo");
  }, []);

  // ssr로 미리 5개 받아오기?
  useEffect(() => {
    const fetchData = async () => {
      try {
        start(key);
        const res = await getCardList({ size: 10, columnId });
        setCardList(
          dashboardIdNum,
          columnId,
          res.data.cards,
          res.data.totalCount
        );
      } catch (error) {
        if (isAxiosError(error)) {
          addToast(
            error.response?.data.message || "카드 목록 조회에 실패했습니다."
          );
        } else {
          addToast("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        stop(key);
      }
    };
    fetchData();
  }, [columnId, setCardList]);

  useEffect(() => {
    const updateMaxVisible = () => {
      const width = window.innerWidth;
      if (width < 768) setMaxVisible(1);
      else if (width < 1200) setMaxVisible(2);
      else setMaxVisible(3);
    };

    updateMaxVisible();
    window.addEventListener("resize", updateMaxVisible);
    return () => window.removeEventListener("resize", updateMaxVisible);
  }, []);

  useEffect(() => {
    setVisibleCount(maxVisible);
  }, [maxVisible]);

  const cardList = useMemo(() => rawCardList ?? [], [rawCardList]);
  const sortedCardList = useMemo(() => {
    return [...cardList].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [cardList]);
  const visibleCards = sortedCardList.slice(0, visibleCount);

  return (
    <section className="py-[16px] px-[12px] md:py-[20px] md:px-[20px] flex flex-col border-b border-gray_EEEEEE lg:border-b-0 lg:border-r lg:min-w-[354px]">
      <DeleteColumnModal
        dashboardId={dashboardIdNum}
        columnId={columnId}
        isOpen={modalState.deleteColumn}
        onClose={() => handleClickClose("deleteColumn")}
      />
      <EditColumnModal
        dashboardId={dashboardIdNum}
        columnId={columnId}
        isOpen={modalState.editColumn}
        onClose={() => handleClickClose("editColumn")}
        onDelete={() => {
          handleClickClose("editColumn");
          handleClickOpen("deleteColumn");
        }}
      />
      <CreateTodoModal
        dashboardId={dashboardIdNum}
        columnId={columnId}
        isOpen={modalState.createTodo}
        onClose={() => handleClickClose("createTodo")}
      />
      {selectedId !== null && (
        <DashBoardModal
          key={selectedId}
          dashboardId={dashboardIdNum}
          columnId={columnId}
          columnName={title}
          cardId={selectedId}
          isOpen={modalState.dashboard}
          onClose={() => handleClickClose("dashboard")}
        />
      )}
      <header className="flex items-center justify-between mb-[24px]">
        <div className="flex items-center gap-x-[8px]">
          <div className="w-[8px] h-[8px] bg-violet_5534DA rounded-full"></div>
          <div className="flex items-center gap-x-[12px]">
            <h1 className="text-lg font-bold md:text-2lg">{title}</h1>
            <span className="bg-gray_EEEEEE rounded-[4px] px-[6px] py-[3px] text-xs text-gray_787486">
              {count}
            </span>
          </div>
        </div>

        <SettingIcon onClick={handleOpenEditColumn} />
      </header>

      <div className="mb-[10px]">
        <AddButton
          mode="todo"
          className="w-full h-[32px] md:h-[40px] py-[6px] md:py-[9px]"
          onClick={handleOpenCreateTodo}
        />
      </div>
      <div className="flex flex-col md:gap-y-[16px]">
        {isLoading ? (
          // ? Array.from({ length: 3 }).map((_, i) => (
          //     <Skeleton className="w-full h-[250px] md:h-[90px] lg:h-[250px]" />
          //   ))
          <Skeleton className="w-full h-[250px] md:h-[90px] lg:h-[250px]" />
        ) : (
          visibleCards.map(({ id }, idx) => (
            <div
              role="button"
              key={id}
              className={`${idx > 0 ? "hidden md:block" : ""}`}
              onClick={() => {
                setSelectedId(id);
                handleClickOpen("dashboard");
              }}
            >
              <ColumnDetailCard
                dashboardId={dashboardIdNum}
                columnId={columnId}
                cardId={id}
              />
            </div>
          ))
        )}
        {!isLoading && visibleCount < sortedCardList.length && (
          <button
            className="text-2lg text-violet_5534DA hidden lg:block"
            onClick={() => setVisibleCount((prev) => prev + maxVisible)}
          >
            더보기
          </button>
        )}
      </div>
    </section>
  );
}

export default React.memo(ColumnCard);
