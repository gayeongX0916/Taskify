"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import moreIcon from "@/assets/more_icon.svg";
import closeIcon from "@/assets/close_icon.svg";
import Image from "next/image";
import { Chip } from "@/components/common/Chip";
import { CommentTextarea } from "@/components/common/Input/CommentTextarea";
import { Comment } from "@/components/Comment";
import { AssigneeCard } from "@/components/Card/Assignee";
import { ActionDropdown } from "@/components/Dropdown/ActionDropdown";
import { ModalProps } from "@/types/ModalProps";
import { TagList } from "@/components/common/TagList";
import { getCardType } from "@/types/cards";
import { useToastStore } from "@/lib/stores/toast";
import { deleteCardDetail, getCardDetail } from "@/lib/api/cards";
import { EditTodoModal } from "../EditTodo";
import { useCardStore } from "@/lib/stores/card";
import { getComment } from "@/lib/api/comments";
import { useCommentStore } from "@/lib/stores/comment";

interface DashBoardModalProps extends ModalProps {
  cardId: number;
  columnName: string;
  columnId: number;
}

export function DashBoardModal({
  isOpen,
  onClose,
  cardId,
  columnName,
  columnId,
}: DashBoardModalProps) {
  const removeCard = useCardStore((state) => state.removeCard);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const addToast = useToastStore.getState().addToast;
  const [detail, setDetail] = useState<getCardType>();
  const commentByCard = useCommentStore((state) => state.commentsByCard);
  const commentList = commentByCard[cardId] || [];
  const setCommentList = useCommentStore((state) => state.setCommentList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCardDetail({ cardId });
        setDetail(res.data);
      } catch (error) {
        addToast("카드 상세 조회에 실패했습니다.");
      }
    };
    fetchData();
  }, [cardId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getComment({ size: 6, cardId });
        setCommentList(cardId, res.data.comments);
      } catch (error) {
        addToast("댓글 조회에 실패했습니다.");
      }
    };
    fetchData();
  }, []);

  if (!detail) return <div>디테일 로딩 중</div>;

  const handleDeleteCard = async () => {
    try {
      await deleteCardDetail({ cardId });
      removeCard(columnId, cardId);
      setShowDropdown(false);
      onClose();
    } catch (error) {
      addToast("카드 삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <EditTodoModal
        columnId={columnId}
        cardId={cardId}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
      <Dialog open={isOpen} onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
          <section className="bg-white_FFFFFF w-full md:w-[730px] px-[16px] py-[16px] md:pt-[30px] md:pr-[38px] md:pb-[33px] md:pl-[18px] rounded-[8px]">
            <header className="flex justify-end md:justify-between items-center mb-[16px] md:mb-[24px]">
              <h2 className="hidden md:block md:text-2xl md:text-black_333236 md:font-bold">
                {detail.title}
              </h2>

              <div className="flex gap-x-[16px] md:gap-x-[24px] relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown((prev) => !prev);
                  }}
                >
                  <Image
                    src={moreIcon}
                    alt="더보기"
                    width={24}
                    height={24}
                    className="md:w-[28px] md:h-[28px]"
                  />
                </button>
                <button onClick={onClose}>
                  <Image
                    src={closeIcon}
                    alt="닫기"
                    width={24}
                    height={24}
                    className="md:w-[28px] md:h-[28px]"
                  />
                </button>
                {showDropdown && (
                  <div className="absolute right-[50px] top-full mt-[8px] z-10">
                    <ActionDropdown
                      setShowDropdown={setShowDropdown}
                      onEdit={() => {
                        setShowDropdown(false);
                        onClose();
                        setShowEditModal(true);
                      }}
                      onDelete={() => handleDeleteCard()}
                    />
                  </div>
                )}
              </div>
            </header>

            <h2 className="text-xl text-black_333236 font-bold flex justify-start mb-[8px] md:hidden">
              {detail.title}
            </h2>

            <main className="flex flex-col-reverse md:flex-row md:justify-between max-h-[70vh] overflow-y-auto pr-[20px] md:gap-x-[20px]">
              <article className="flex flex-col min-w-[440px]">
                <div className="flex gap-x-[12px] items-center md:gap-x-[20px]">
                  <Chip name={columnName} className="text-xs" />
                  <span className="border-l border-gray_D9D9D9 h-[20px]" />
                  <TagList
                    tags={detail.tags}
                    className="gap-x-[8px] md:gap-x-[6px]"
                  />
                </div>

                <p className="text-md mt-[16px] lg:mt-[26px]">
                  {detail.description}
                </p>

                {detail.imageUrl === null ? (
                  <div className="hidden"></div>
                ) : (
                  <Image
                    src={detail.imageUrl}
                    alt="예시"
                    width={290}
                    height={168}
                    className="w-full h-full mt-[32px] md:mt-[16px] lg:mt-[8px] md:w-[420px] md:h-[246px] lg:w-[445px] lg:h-[260px]"
                  />
                )}

                <div className="mt-[24px] lg:mt-[16px]">
                  <CommentTextarea cardId={cardId} columnId={columnId} />
                </div>

                <div className="mt-[16px] md:mt-[24px] flex flex-col gap-y-[8px]">
                  {commentList.map(({ id, author, createdAt, content,cardId }) => (
                    <Comment
                      key={id}
                      name={author.nickname}
                      date={createdAt}
                      content={content}
                      cardId={cardId}
                      commentId={id}
                    />
                  ))}
                </div>
              </article>

              <AssigneeCard
                name={detail.assignee.nickname}
                date={detail.dueDate}
              />
            </main>
          </section>
        </div>
      </Dialog>
    </>
  );
}
