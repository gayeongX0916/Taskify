"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import  ModalButton  from "@/components/common/Button/ModalButton";
import { BaseInput } from "@/components/common/Input/BaseInput";
import { TextareaInput } from "@/components/common/Input/ModalInput/TextareaInput";
import { DateInput } from "@/components/common/Input/ModalInput/DateInput";
import { TagInput } from "@/components/common/Input/ModalInput/TagInput";
import { ImageInput } from "@/components/common/Input/ModalInput/ImageInput";
import  AssigneeDropdown  from "@/components/Dropdown/AssigneeDropdown";
import { ModalProps } from "@/types/ModalProps";
import { postCard } from "@/lib/api/cards";
import { useToastStore } from "@/lib/stores/toast";
import { useCardStore } from "@/lib/stores/card";
import { formatDateTime } from "@/lib/utils/formatDate";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";

interface postCardFormValues {
  assigneeUserId: number;
  columnId: number;
  dashboardId: number;
  title: string;
  description: string;
  dueDate: Date | null;
  tags: string[];
  imageUrl?: string;
}

interface CreateTodoModalProps extends ModalProps {
  columnId: number;
  dashboardId: number;
}

export function CreateTodoModal({
  isOpen,
  onClose,
  columnId,
  dashboardId,
}: CreateTodoModalProps) {
  const key = "CreateTodoModal";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const addToast = useToastStore.getState().addToast;
  const addCard = useCardStore((state) => state.addCard);
  const initialValues: postCardFormValues = {
    assigneeUserId: 0,
    columnId: columnId,
    dashboardId: dashboardId,
    title: "",
    description: "",
    dueDate: null,
    tags: [],
    imageUrl: "",
  };
  const [values, setValues] = useState<postCardFormValues>(initialValues);

  const handlePostCard = async () => {
    try {
      start(key);
      const payload = {
        ...values,
        dueDate: values.dueDate ? formatDateTime(values.dueDate) : "",
      };

      if (!payload.imageUrl || payload.imageUrl.trim() === "") {
        delete payload.imageUrl;
      }
      const res = await postCard({ ...payload });
      addCard(dashboardId, columnId, res.data);
      onClose();
      addToast("카드 생성에 성공했습니다.", "success");
      setValues(initialValues);
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(error.response?.data.message || "카드 생성에 실패했습니다.");
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
        <section className="flex flex-col max-h-[90vh] bg-white_FFFFFF min-w-[327px] w-full pt-[28px] px-[20px] pb-[20px] rounded-[16px] md:w-[584px]">
          <h1 className="text-lg text-black_333236 mb-[32px] font-bold md:text-2xl">
            할 일 생성
          </h1>

          <main className="flex flex-col gap-y-[24px] overflow-y-auto pr-[20px]">
            <div className="flex flex-col gap-y-[8px]">
              <span className="text-lg text-black_333236">담당자 *</span>
              <AssigneeDropdown
                onSelect={(userId) =>
                  setValues({ ...values, assigneeUserId: userId })
                }
              />
            </div>

            <BaseInput
              label="제목 *"
              placeholder="제목을 입력해 주세요"
              value={values.title}
              onChange={(value) => setValues({ ...values, title: value })}
              mode="any"
            />
            <TextareaInput
              label="설명 *"
              placeholder="설명을 입력해 주세요"
              value={values.description}
              onChange={(value) => setValues({ ...values, description: value })}
            />
            <DateInput
              label="마감일 *"
              placeholder="날짜를 입력해 주세요"
              value={values.dueDate}
              onChange={(date) => setValues({ ...values, dueDate: date })}
            />
            <TagInput
              label="태그"
              placeholder="입력 후 Enter"
              value={values.tags}
              onChange={(value) => setValues({ ...values, tags: value })}
            />
            <ImageInput
              label="이미지"
              columnId={columnId}
              onChange={(url) => setValues({ ...values, imageUrl: url })}
            />
          </main>

          <footer className="flex gap-x-[11px] mt-[24px]">
            <ModalButton mode="cancel" onClick={onClose} disabled={isLoading}>
              취소
            </ModalButton>
            <ModalButton
              mode="any"
              onClick={handlePostCard}
              disabled={isLoading}
            >
              {isLoading ? "생성 중..." : "생성"}
            </ModalButton>
          </footer>
        </section>
      </div>
    </Dialog>
  );
}
