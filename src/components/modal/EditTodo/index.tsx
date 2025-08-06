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
import { getCardDetail, putCard } from "@/lib/api/cards";
import { useToastStore } from "@/lib/stores/toast";
import { BaseCardType } from "@/types/cards";
import { getColumnList } from "@/lib/api/columns";
import { useParams } from "next/navigation";
import { getColumnListType } from "@/types/columns";
import { formatDate } from "@/lib/utils/formatDate";
import { useCardStore } from "@/lib/stores/card";

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
  const addToast = useToastStore.getState().addToast;
  const [values, setValues] = useState<BaseCardType>({
    assigneeUserId: 0,
    columnId: 0,
    title: "",
    description: "",
    dueDate: "",
    tags: [],
    imageUrl: "",
  });
  const [columnList, setColumnList] = useState<getColumnListType[]>([]);
  const updateCard = useCardStore((state) => state.updateCard);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCardDetail({ cardId });
        const card = res.data;
        setValues({
          assigneeUserId: card.assignee?.id ?? 0,
          columnId: card.columnId,
          title: card.title,
          description: card.description,
          dueDate: card.dueDate,
          tags: card.tags,
          imageUrl: card.imageUrl,
        });
      } catch (error) {
        addToast("");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchColumnList = async () => {
      try {
        const res = await getColumnList({ dashboardId: Number(dashboardId) });
        setColumnList(res.data.data);
      } catch (error) {
        addToast("컬럼 목록 조회에 실패했습니다.");
      }
    };
    fetchColumnList();
  }, []);

  if (!values) return null;

  const handleEditTodo = async (data: BaseCardType) => {
    if (!values) return;
    try {
      const payload = { ...data };
      if (!payload.imageUrl || payload.imageUrl.trim() === "") {
        delete payload.imageUrl;
      }
      const res = await putCard({ cardId, ...payload });
      updateCard(columnId, res.data);
      onClose();
    } catch (error) {
      addToast("컬럼 수정에 실패했습니다.");
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
                  columnId={columnId}
                  columnList={columnList}
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
                    setValues({
                      ...values,
                      assigneeUserId: userId, // BaseCardType 유지
                    })
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
              value={values.dueDate ? new Date(values.dueDate) : null}
              onChange={(date) =>
                setValues({
                  ...values,
                  dueDate: formatDate(date),
                })
              }
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
