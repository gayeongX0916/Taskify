"use client";

import { useState } from "react";
import { ActionButton } from "../../Button/ActionButton";
import { useCommentStore } from "@/lib/stores/comment";
import { useToastStore } from "@/lib/stores/toast";
import { postComment } from "@/lib/api/comments";
import { postCommentType } from "@/types/comments";
import { useParams } from "next/navigation";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";
import React from "react";

type CommentTextareaProps = {
  cardId: number;
  columnId: number;
};

export function CommentTextarea({ cardId, columnId }: CommentTextareaProps) {
  const addToast = useToastStore.getState().addToast;
  const { dashboardId } = useParams();
  const dashboardIdNum = Number(dashboardId);
  const key = "commentTextarea";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const addComment = useCommentStore((state) => state.addComment);
  const [value, setValue] = useState("");

  const handleAddComment = async (data: postCommentType) => {
    try {
      start(key);
      const res = await postComment(data);
      addComment(cardId, res.data);
      setValue("");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(error.response?.data.message || "댓글 생성에 실패했습니다.");
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  };

  return (
    <div className="flex flex-col gap-y-[4px]">
      <label className="text-lg text-black_333236">댓글</label>
      <div className="flex relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="댓글 작성하기"
          className="w-full px-[12px] py-[12px] rounded-[6px] border border-gray_D9D9D9 resize-none text-md text-black_171717 focus:outline-none focus:border-violet_5534DA lg:px-[16px] lg:py-[16px]"
        />
        <ActionButton
          className="absolute right-[12px] bottom-[12px]"
          onClick={() =>
            handleAddComment({
              cardId: cardId,
              columnId: columnId,
              dashboardId: dashboardIdNum,
              content: value,
            })
          }
          disabled={isLoading}
        >
          {isLoading ? "입력 중..." : "입력"}
        </ActionButton>
      </div>
    </div>
  );
}
