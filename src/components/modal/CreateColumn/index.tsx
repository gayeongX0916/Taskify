"use client";

import ModalButton from "@/components/common/Button/ModalButton";
import { postColumn } from "@/lib/api/columns";
import { useColumnStore } from "@/lib/stores/column";
import { useLoadingStore } from "@/lib/stores/loading";
import { useToastStore } from "@/lib/stores/toast";
import { postColumnType } from "@/types/columns";
import { ModalProps } from "@/types/ModalProps";
import { Dialog } from "@headlessui/react";
import { isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function CreateColumnModal({ isOpen, onClose }: ModalProps) {
  const key = "CreateColumnModal";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const { dashboardId } = useParams();
  const dashboardIdNum = Number(dashboardId);
  const addToast = useToastStore.getState().addToast;
  const addColumn = useColumnStore((s) => s.addColumn);
  const columnsByDashboard = useColumnStore(
    (state) => state.columnsByDashboard?.[dashboardIdNum]
  );
  const columnArray = columnsByDashboard
    ? Object.values(columnsByDashboard)
    : [];
  const [existed, setExisted] = useState(false);
  const [value, setValue] = useState("");

  const handleCreateColumn = async (data: postColumnType) => {
    try {
      start(key);
      const res = await postColumn(data);
      addColumn(Number(dashboardId), res.data);
      onClose();
      setValue("");
      addToast("컬럼 생성에 성공했습니다.", "success");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(error.response?.data.message || "컬럼 생성에 실패했습니다.");
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  };

  useEffect(() => {
    const isExisted = columnArray.some((col) => col.title === value);
    setExisted(isExisted);
  }, [value, columnsByDashboard]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
        <section className="bg-white_FFFFFF px-[16px] py-[24px] rounded-[8px] min-w-[327px] md:w-[568px] w-full">
          <h1 className="text-xl text-black_333236 font-bold mb-[16px]">
            새 컬럼 생성
          </h1>

          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateColumn({
                title: value,
                dashboardId: Number(dashboardId),
              });
            }}
          >
            <div className="flex flex-col gap-y-[8px] mb-[24px]">
              <label
                htmlFor="column-name"
                className="text-lg text-black_333236"
              >
                이름
              </label>
              <input
                id="column-name"
                className={`px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9 ${
                  existed ? "border-red_D6173A" : ""
                }`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {existed && (
                <span className="text-md text-red_D6173A">
                  중복된 컬럼 이름입니다.
                </span>
              )}
            </div>
            <footer className="flex gap-x-[7px]">
              <ModalButton
                mode="cancel"
                type="button"
                onClick={onClose}
                disabled={isLoading}
              >
                취소
              </ModalButton>
              <ModalButton
                mode="any"
                type="button"
                onClick={() =>
                  handleCreateColumn({
                    title: value,
                    dashboardId: Number(dashboardId),
                  })
                }
                disabled={isLoading}
              >
                {isLoading ? "생성 중..." : "생성"}
              </ModalButton>
            </footer>
          </form>
        </section>
      </div>
    </Dialog>
  );
}
