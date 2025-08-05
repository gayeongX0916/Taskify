import { ModalButton } from "@/components/common/Button/ModalButton";
import { deleteColumn } from "@/lib/api/columns";
import { useToastStore } from "@/lib/stores/toast";
import { ModalProps } from "@/types/ModalProps";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";

interface DeleteColumnModalProps extends ModalProps {
  columnId: number;
  onDelete: (columnId: number) => void;
}

export function DeleteColumnModal({
  isOpen,
  onClose,
  columnId,
  onDelete,
}: DeleteColumnModalProps) {
  const router = useRouter();
  const addToast = useToastStore.getState().addToast;

  const handleDeleteColumn = async () => {
    try {
      await deleteColumn({ columnId });
      onClose();
      onDelete(columnId);
    } catch (error) {
      addToast("컬럼 삭제에 실패했습니다.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
        <div className="bg-white_FFFFFF px-[16px] py-[24px] rounded-[16px] min-w-[327px] w-full md:w-[568px] flex flex-col gap-y-[20px] md:gap-y-[30px]">
          <span className="text-lg text-black_333236 md:text-xl text-center">
            컬럼의 모든 카드가 삭제됩니다.
          </span>
          <div className="flex gap-x-[7px]">
            <ModalButton mode="cancel" onClick={onClose}>
              취소
            </ModalButton>
            <ModalButton mode="any" onClick={handleDeleteColumn}>
              삭제
            </ModalButton>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
