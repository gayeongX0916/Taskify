import ModalButton from "@/components/common/Button/ModalButton";
import { deleteColumn } from "@/lib/api/columns";
import { useColumnStore } from "@/lib/stores/column";
import { useLoadingStore } from "@/lib/stores/loading";
import { ModalProps } from "@/types/ModalProps";
import { Dialog } from "@headlessui/react";
import { isAxiosError } from "axios";
import { useCallback } from "react";
import { toast } from "react-toastify";

interface DeleteColumnModalProps extends ModalProps {
  columnId: number;
  dashboardId: number;
}

export function DeleteColumnModal({
  isOpen,
  onClose,
  columnId,
  dashboardId,
}: DeleteColumnModalProps) {
  const key = "DeleteColumnModal";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const removeColumn = useColumnStore((s) => s.removeColumn);

  const handleDeleteColumn = useCallback(async () => {
    try {
      start(key);
      await deleteColumn({ columnId });
      removeColumn(dashboardId, columnId);
      onClose();
      toast.success("컬럼 삭제에 성공했습니다.");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "컬럼 삭제에 실패했습니다.");
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  }, [removeColumn, onClose, columnId, dashboardId, start, stop]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
        <div className="bg-white_FFFFFF px-[16px] py-[24px] rounded-[16px] min-w-[327px] w-full md:w-[568px] flex flex-col gap-y-[20px] md:gap-y-[30px]">
          <span className="text-lg text-black_333236 md:text-xl text-center">
            컬럼의 모든 카드가 삭제됩니다.
          </span>
          <div className="flex gap-x-[7px]">
            <ModalButton mode="cancel" onClick={onClose} disabled={isLoading}>
              취소
            </ModalButton>
            <ModalButton
              mode="any"
              onClick={handleDeleteColumn}
              disabled={isLoading}
            >
              {isLoading ? "삭제 중..." : "삭제"}
            </ModalButton>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
