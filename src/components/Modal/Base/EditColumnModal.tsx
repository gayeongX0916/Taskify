import { ModalProps } from "@/types/ModalProps";
import { BaseModal } from ".";
import ModalButton from "@/components/common/Button/ModalButton";
import { useColumnStore } from "@/lib/stores/column";
import { putColumnType } from "@/types/columns";
import { putColumn } from "@/lib/api/columns";
import { useCallback, useState } from "react";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

interface EditColumnModalProps extends ModalProps {
  onDelete: () => void;
  columnId: number;
  dashboardId: number;
}

export function EditColumnModal({
  isOpen,
  onClose,
  onDelete,
  columnId,
  dashboardId,
}: EditColumnModalProps) {
  const updateColumn = useColumnStore((s) => s.updateColumn);
  const key = "EditColumnModal";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const [value, setValue] = useState("");

  const handleUpdateColumn = useCallback(
    async (data: putColumnType) => {
      try {
        start(key);
        const res = await putColumn(data);
        updateColumn(dashboardId, res.data.id, res.data.title);
        onClose();
        setValue("");
        toast.success("컬럼 수정에 성공했습니다.");
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message || "컬럼 수정에 실패했습니다.");
        } else {
          toast.error("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        stop(key);
      }
    },
    [updateColumn, onClose, dashboardId, start, stop]
  );

  const handleClose = useCallback(() => {
    onClose();
    setValue("");
  }, [onClose]);

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} title="컬럼 관리">
      <div className="flex flex-col gap-y-[8px] mb-[24px]">
        <span className="text-lg text-black_333236">이름</span>
        <input
          className="px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="flex gap-x-[7px]">
        <ModalButton mode="cancel" onClick={onDelete} disabled={isLoading}>
          삭제
        </ModalButton>
        <ModalButton
          mode="any"
          onClick={() =>
            handleUpdateColumn({ columnId: columnId, title: value })
          }
          disabled={isLoading}
        >
          {isLoading ? "변경 중..." : "변경"}
        </ModalButton>
      </div>
    </BaseModal>
  );
}
