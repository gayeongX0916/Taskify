import { ModalProps } from "@/types/ModalProps";
import { BaseModal } from ".";
import { ModalButton } from "@/components/common/Button/ModalButton";
import { useColumnStore } from "@/lib/stores/column";
import { putColumnType } from "@/types/columns";
import { putColumn } from "@/lib/api/columns";
import { useToastStore } from "@/lib/stores/toast";
import { useState } from "react";

interface EditColumnModalProps extends ModalProps {
  onDelete: () => void;
  columnId: number;
}

export function EditColumnModal({
  isOpen,
  onClose,
  onDelete,
  columnId,
}: EditColumnModalProps) {
  const [value, setValue] = useState("");
  const updateColumn = useColumnStore((state) => state.updateColumn);
  const addToast = useToastStore.getState().addToast;

  const handleUpdateColumn = async (data: putColumnType) => {
    try {
      const res = await putColumn(data);
      updateColumn(res.data.id, res.data.title);
      onClose();
      setValue("");
    } catch {
      addToast("컬럼 수정에 실패했습니다.");
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="컬럼 관리">
      <div className="flex flex-col gap-y-[8px] mb-[24px]">
        <span className="text-lg text-black_333236">이름</span>
        <input
          className="px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="flex gap-x-[7px]">
        <ModalButton mode="cancel" onClick={onDelete}>
          삭제
        </ModalButton>
        <ModalButton
          mode="any"
          onClick={() =>
            handleUpdateColumn({ columnId: columnId, title: value })
          }
        >
          변경
        </ModalButton>
      </div>
    </BaseModal>
  );
}
