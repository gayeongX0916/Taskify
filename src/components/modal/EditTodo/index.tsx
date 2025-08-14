"use client";

import { AssigneeDropdown } from "@/components/Dropdown/AssigneeDropdown";
import { ProgressDropdown } from "@/components/Dropdown/ProgressDropdown";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import editIcon from "@/assets/edit_icon.svg";
import { ModalButton } from "@/components/common/Button/ModalButton";
import { BaseInput } from "@/components/common/Input/BaseInput";
import { TextareaInput } from "@/components/common/Input/ModalInput/TextareaInput";
import { DateInput } from "@/components/common/Input/ModalInput/DateInput";
import { TagInput } from "@/components/common/Input/ModalInput/TagInput";
import { ImageInput } from "@/components/common/Input/ModalInput/ImageInput";
import { ModalProps } from "@/types/ModalProps";
import { putCard } from "@/lib/api/cards";
import { useToastStore } from "@/lib/stores/toast";
import { useParams } from "next/navigation";
import { formatDateTime } from "@/lib/utils/formatDate";
import { useCardStore } from "@/lib/stores/card";
import { useColumnStore } from "@/lib/stores/column";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";
import { Spinner } from "@/components/common/Spinner";

interface EditCardFormValues {
  columnId: number;
  title: string;
  description: string;
  dueDate: Date | null;
  tags: string[];
  imageUrl?: string;
  assigneeUserId: number;
}

interface EditTodoModalProps extends ModalProps {
  cardId: number;
  columnId: number;
}

export function EditTodoModal({
  isOpen,
  onClose,
  cardId,
  columnId,
}: EditTodoModalProps) {
  const { dashboardId } = useParams();
  const dashboardIdNum = Number(dashboardId);
  const key = "EditTodoModal";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const addToast = useToastStore.getState().addToast;
  const columnList = useColumnStore(
    (state) => state.columnsByDashboard[dashboardIdNum]
  );
  const columnArray = Object.values(columnList) ?? [];
  const cardList = useCardStore(
    (state) => state.cardsByDashboard?.[dashboardIdNum]?.[columnId] ?? []
  );
  const card = cardList.find((c) => c.id === cardId);
  const updateCard = useCardStore((state) => state.updateCard);
  const [values, setValues] = useState<EditCardFormValues>({
    columnId,
    title: "",
    description: "",
    dueDate: null,
    tags: [],
    imageUrl: "",
    assigneeUserId: 0,
  });

  useEffect(() => {
    if (card) {
      setValues({
        columnId: card.columnId,
        title: card.title,
        description: card.description,
        dueDate: card.dueDate ? new Date(card.dueDate) : null,
        tags: card.tags,
        imageUrl: card.imageUrl || "",
        assigneeUserId: card.assignee.id,
      });
    }
  }, [card]);

  if (!values || isLoading)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
        <div className="flex flex-col justify-center items-center h-[600px] bg-white_FFFFFF min-w-[327px] w-full rounded-[16px] md:w-[540px]">
          <Spinner />
        </div>
      </div>
    );

  const handleEditTodo = async (data: EditCardFormValues) => {
    try {
      start(key);
      const payload = {
        ...data,
        dueDate: data.dueDate ? formatDateTime(data.dueDate) : "",
        imageUrl: data.imageUrl?.trim() ? data.imageUrl : null, 
      };
      const res = await putCard({ id: cardId, ...payload });
      updateCard(dashboardIdNum, payload.columnId, res.data);
      onClose();
      addToast("컬럼 수정에 성공했습니다.", "success");
      setValues({
        columnId,
        title: "",
        description: "",
        dueDate: null,
        tags: [],
        imageUrl: "",
        assigneeUserId: 0,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(error.response?.data.message || "컬럼 수정에 실패했습니다.");
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
            할 일 수정
          </h1>

          <main className="flex flex-col gap-y-[32px] overflow-y-auto pr-[20px]">
            <div className="flex flex-col items-center gap-y-[32px] md:flex-row md:gap-x-[32px]">
              <div className="flex flex-col gap-y-[8px] w-full md:w-[256px]">
                <span className="text-lg text-black_333236">상태</span>
                <ProgressDropdown
                  columnId={values.columnId}
                  columnList={columnArray}
                  onSelect={(columnId) =>
                    setValues({ ...values, columnId: columnId })
                  }
                />
              </div>
              <div className="flex flex-col gap-y-[8px] w-full md:w-[256px]">
                <span className="text-lg text-black_333236">담당자</span>
                <AssigneeDropdown
                  initialUserId={values.assigneeUserId}
                  onSelect={(userId) =>
                    setValues({ ...values, assigneeUserId: userId })
                  }
                />
              </div>
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
              initialUrl={values.imageUrl}
            />
          </main>

          <footer className="flex gap-x-[11px] mt-[24px]">
            <ModalButton mode="cancel" onClick={onClose}>
              취소
            </ModalButton>
            <ModalButton mode="any" onClick={() => handleEditTodo(values)}>
              수정
            </ModalButton>
          </footer>
        </section>
      </div>
    </Dialog>
  );
}
