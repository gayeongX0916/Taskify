import { formatDate } from "@/lib/utils/formatDate";
import { Avatar } from "../common/Avatar";
import { useCommentStore } from "@/lib/stores/comment";
import { useToastStore } from "@/lib/stores/toast";
import { deleteComment, putComment } from "@/lib/api/comments";
import { useState } from "react";

type CommentProps = {
  name: string;
  date: string;
  content: string;
  cardId: number;
  commentId: number;
};

export function Comment({
  name,
  date,
  content,
  cardId,
  commentId,
}: CommentProps) {
  const [value, setValue] = useState(content);
  const removeComment = useCommentStore((state) => state.removeComment);
  const updateComment = useCommentStore((state) => state.updateComment);
  const addToast = useToastStore.getState().addToast;
  const [isEditing, setIsEditing] = useState(false);

  const handleonEdit = () => {
    setIsEditing(true);
  };

  const handleonEditCompleted = async () => {
    try {
      await putComment({ commentId, content: value });
      updateComment(cardId, commentId, value);
      setIsEditing(false);
    } catch (error) {
      addToast("댓글 수정에 실패했습니다.");
    }
  };

  const handleonDelete = async () => {
    try {
      await deleteComment({ commentId });
      removeComment(cardId, commentId);
    } catch (error) {
      addToast("댓글 삭제에 실패했습니다.");
    }
  };

  const buttonList = [
    {
      label: isEditing ? "완료" : "수정",
      onClick: isEditing ? handleonEditCompleted : handleonEdit,
    },
    { label: "삭제", onClick: handleonDelete },
  ];

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
            {formatDate(new Date(date))}
          </time>
        </div>

        {isEditing ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="text-xs md:text-md text-black_333236 border border-gray_9FA6B2 px-[5px] py-[10px] rounded-[8px] overflow-y-auto resize-none"
            rows={3}
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
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
