import { ModalProps } from "@/types/ModalProps";
import { BaseModal } from ".";
import { ModalButton } from "@/components/common/Button/ModalButton";

interface EditColumnModalProps extends ModalProps {
  onDelete: () => void;
}

export function EditColumnModal({
  isOpen,
  onClose,
  onDelete,
}: EditColumnModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="컬럼 관리">
      <div className="flex flex-col gap-y-[8px] mb-[24px]">
        <span className="text-lg text-black_333236">이름</span>
        <input className="px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9" />
      </div>
      <div className="flex gap-x-[7px]">
        <ModalButton mode="cancel" onClick={onDelete}>
          삭제
        </ModalButton>
        <ModalButton mode="any">변경</ModalButton>
      </div>
    </BaseModal>
  );
}
