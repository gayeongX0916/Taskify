"use client";

import { AssigneeDropdown } from "@/components/dropdown/assignee";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { ModalButton } from "@/components/common/Button/ModalButton";
import { BaseInput } from "@/components/common/Input/BaseInput";
import { TextareaInput } from "@/components/common/Input/ModalInput/TextareaInput";
import { DateInput } from "@/components/common/Input/ModalInput/dateInput";
import { TagInput } from "@/components/common/Input/ModalInput/TagInput";
import { ImageInput } from "@/components/common/Input/ModalInput/ImageInput";

export function ModalCreateTodo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={true} onClose={setIsOpen}>
      <div className="fixed inset-0 bg-black bg-opacity-30">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white_FFFFFF min-w-[327px] w-full pt-[28px] px-[20px] pb-[20px] rounded-[16px] md:w-[584px]">
            <h1 className="text-lg text-black_333236 mb-[32px] font-bold md:text-2xl">
              할 일 생성
            </h1>
            <div className="flex flex-col gap-y-[24px]">
              <div className="flex flex-col gap-y-[8px]">
                <span className="text-lg text-black_333236">담당자</span>
                <AssigneeDropdown />
              </div>
              <BaseInput label="제목 *" placeholder="제목을 입력해 주세요" />
              <TextareaInput
                label="설명 *"
                placeholder="설명을 입력해 주세요"
              />
              <DateInput label="마감일 *" />
              <TagInput label="태그" placeholder="입력 후 Enter" />
              <ImageInput label="이미지" />

              <div className="flex gap-x-[11px]">
                <ModalButton mode="cancel">취소</ModalButton>
                <ModalButton mode="any">생성</ModalButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
