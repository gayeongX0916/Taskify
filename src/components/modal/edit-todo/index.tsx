"use client";

import { AssigneeDropdown } from "@/components/Dropdown/AssigneeDropdown";
import { ProgressDropdown } from "@/components/Dropdown/ProgressDropdown";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import editIcon from "@/assets/edit_icon.svg";
import { ModalButton } from "@/components/common/Button/ModalButton";
import { BaseInput } from "@/components/common/Input/BaseInput";
import { TextareaInput } from "@/components/common/Input/ModalInput/TextareaInput";
import { DateInput } from "@/components/common/Input/ModalInput/DateInput";
import { TagInput } from "@/components/common/Input/ModalInput/TagInput";
import { ImageInput } from "@/components/common/Input/ModalInput/ImageInput";

type ModalValues = {
  progress: string;
  assignee: string;
  title: string;
  des: string;
  date: Date | null;
  tag: string[];
  img: string;
};

export function ModalEditTodo() {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<ModalValues>({
    progress: "To Do",
    assignee: "배유철",
    title: "제목",
    des: "내용입니다",
    date: new Date("2025-05-04T11:15:00"),
    tag: ["안녕", "하이루"],
    img: "",
  });

  return (
    <Dialog open={true} onClose={setIsOpen}>
      <div className="fixed inset-0 bg-black bg-opacity-30">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white_FFFFFF min-w-[327px] w-full pt-[28px] px-[20px] pb-[20px] rounded-[16px] md:w-[584px]">
            <h1 className="text-lg text-black_333236 mb-[32px] font-bold md:text-2xl">
              할 일 수정
            </h1>
            <div className="flex flex-col gap-y-[32px]">
              <div className="flex flex-col items-center gap-y-[32px] md:flex-row md:gap-x-[32px]">
                <div className="flex flex-col gap-y-[8px] w-full md:w-[256px]">
                  <span className="text-lg text-black_333236">상태</span>
                  <ProgressDropdown initialValue={values.progress} />
                </div>
                <div className="flex flex-col gap-y-[8px] w-full md:w-[256px]">
                  <span className="text-lg text-black_333236">담당자</span>
                  <AssigneeDropdown initialValue={values.assignee} />
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
                value={values.des}
                onChange={(value) => setValues({ ...values, des: value })}
              />
              <DateInput
                label="마감일 *"
                placeholder="날짜를 입력해 주세요"
                value={values.date}
                onChange={(value) => setValues({ ...values, date: value })}
              />
              <TagInput
                label="태그"
                placeholder="입력 후 Enter"
                value={values.tag}
                onChange={(value) => setValues({ ...values, tag: value })}
              />
              <ImageInput label="이미지" />

              <div className="flex gap-x-[11px]">
                <ModalButton mode="cancel">취소</ModalButton>
                <ModalButton mode="any">수정</ModalButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
