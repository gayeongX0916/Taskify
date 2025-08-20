import { formatDateTimeUTC } from "@/lib/utils/formatDate";
import Avatar from "../common/Avatar";
import { useCommentStore } from "@/lib/stores/comment";
import { useToastStore } from "@/lib/stores/toast";
import { deleteComment, putComment } from "@/lib/api/comments";
import { useCallback, useMemo, useState } from "react";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";
import React from "react";

type CommentProps = {
  name: string;
  date: string;
  content: string;
  cardId: number;
  commentId: number;
};

function Comment({ name, date, content, cardId, commentId }: CommentProps) {
  const addToast = useToastStore.getState().addToast;
  const key = "comment";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const removeComment = useCommentStore((s) => s.removeComment);
  const updateComment = useCommentStore((s) => s.updateComment);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);

  const handleonEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleonEditCompleted = useCallback(async () => {
    try {
      start(key);
      await putComment({ commentId, content: value });
      updateComment(cardId, commentId, value);
      setIsEditing(false);
      addToast("댓글 수정에 성공했습니다.", "success");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(error.response?.data.message || "댓글 수정에 실패했습니다");
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  }, [commentId, value, updateComment, cardId, addToast]);

  const handleonDelete = useCallback(async () => {
    try {
      start(key);
      await deleteComment({ commentId });
      removeComment(cardId, commentId);
      addToast("댓글 삭제에 성공했습니다.", "success");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(error.response?.data.message || "댓글 삭제에 실패했습니다");
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  }, [commentId, removeComment, cardId, addToast]);

  const buttonList = useMemo(
    () => [
      {
        label: isEditing ? "완료" : "수정",
        onClick: isEditing ? handleonEditCompleted : handleonEdit,
      },
      { label: "삭제", onClick: handleonDelete },
    ],
    [isEditing, handleonEditCompleted, handleonEdit, handleonDelete]
  );

  return (
    <div className="flex gap-x-[10px]">
      <Avatar
        username={name}
        className="w-[26px] h-[26px] md:w-[34px] md:h-[34px] text-xs md:text-lg"
      />

      <div className="flex flex-col gap-y-[6px] w-full">
        <div className="flex gap-x-[8px] items-center">
          <span className="text-xs md:text-md font-semibold text-black_333236">
            {name}
          </span>

          <time className="text-xs text-gray_9FA6B2">
            {formatDateTimeUTC(new Date(date))}
          </time>
        </div>

        {isEditing ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="text-xs md:text-md text-black_333236 border border-gray_9FA6B2 px-[5px] py-[10px] rounded-[8px] overflow-y-auto resize-none"
            rows={3}
            disabled={isLoading}
          />
        ) : (
          <p className="text-xs md:text-md text-black_333236">{content}</p>
        )}

        <div className="flex gap-x-[14px]">
          {buttonList.map(({ label, onClick }) => (
            <button
              key={label}
              className="text-xxs md:text-xs text-gray_9FA6B2 underline"
              onClick={onClick}
              disabled={isLoading}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Comment);
