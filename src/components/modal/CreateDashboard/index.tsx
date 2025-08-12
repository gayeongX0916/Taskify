"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import checkIcon from "@/assets/white_check_icon.svg";
import Image from "next/image";
import { ModalButton } from "@/components/common/Button/ModalButton";
import { colorList } from "@/lib/utils/dashboardColor";
import { ModalProps } from "@/types/ModalProps";
import { postDashboard } from "@/lib/api/dashboards";
import { postDashboardType } from "@/types/dashboards";
import { useToastStore } from "@/lib/stores/toast";
import { useDashboardStore } from "@/lib/stores/dashboard";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";

export function CreateDashboardModal({ isOpen, onClose }: ModalProps) {
  const key = "CreateDashboardModal";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const addToast = useToastStore.getState().addToast;
  const addDashboard = useDashboardStore((state) => state.addDashboard);
  const [color, setColor] = useState("");
  const [title, setTitle] = useState("");

  const handleCreateDashboard = async (data: postDashboardType) => {
    try {
      start(key);
      const res = await postDashboard(data);
      addDashboard(res.data);
      onClose();
      setTitle("");
      setColor("");
      addToast("대시보드 생성에 성공했습니다.", "success");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(
          error.response?.data.message || "대시보드 생성에 실패했습니다."
        );
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
        <section className="bg-white_FFFFFF px-[16px] py-[20px] rounded-[8px] w-full min-w-[327px] md:w-[584px] md:px-[32px] md:py-[32px]">
          <h1 className="text-xl text-black_333236 mb-[24px] font-bold md:text-2xl">
            새로운 대시보드
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateDashboard({ title, color });
            }}
          >
            <div className="flex flex-col gap-y-[8px] mb-[16px]">
              <label
                htmlFor="dashboard-name"
                className="text-lg text-black_333236"
              >
                대시보드 이름
              </label>
              <input
                id="dashboard-name"
                className="px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9 w-full h-[50px]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex gap-x-[8px]">
              {colorList.map((list) => (
                <button
                  key={list}
                  type="button"
                  onClick={() => setColor(list)}
                  style={{ backgroundColor: list }}
                  className="w-[30px] h-[30px] rounded-full flex justify-center items-center"
                >
                  {color === list && <Image src={checkIcon} alt="체크" />}
                </button>
              ))}
            </div>

            <footer className="flex gap-x-[7px] mt-[32px] md:mt-[40px]">
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
                onClick={() => handleCreateDashboard({ title, color })}
                type="button"
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
