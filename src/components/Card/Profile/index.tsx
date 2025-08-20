"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import plusIcon from "@/assets/plus_icon.svg";
import { BaseInput } from "@/components/common/Input/BaseInput";
import ModalButton from "@/components/common/Button/ModalButton";
import { postProfileImg, putMyInfo } from "@/lib/api/users";
import { useToastStore } from "@/lib/stores/toast";
import { UserChangeType } from "@/types/users";
import { useUserStore } from "@/lib/stores/user";
import { isAxiosError } from "axios";
import { LoadingProps } from "@/types/loading";

export function ProfileCard({ isLoading, start, stop }: LoadingProps) {
  const key = "profile";
  const addToast = useToastStore.getState().addToast;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const myInfo = useUserStore((s) => s.myInfo);
  const updateMyInfo = useUserStore((s) => s.updateMyInfo);
  const [isTyping, setIsTyping] = useState(false);
  const [localNickname, setLocalNickname] = useState(myInfo?.nickname ?? "");
  const [localProfileImageUrl, setLocalProfileImageUrl] = useState(
    myInfo?.profileImageUrl ?? null
  );

  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (myInfo && !localNickname) {
      setLocalNickname(myInfo.nickname);
    }
    if (myInfo && localProfileImageUrl === null) {
      setLocalProfileImageUrl(myInfo.profileImageUrl ?? null);
    }
  }, [myInfo]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (!selectedFile) return;

    try {
      start(key);
      const res = await postProfileImg(selectedFile);
      setLocalProfileImageUrl(res.data.profileImageUrl);
      setIsTyping(true);
      addToast("이미지 생성에 성공했습니다.", "success");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(error.response?.data.message || "이미지 생성에 실패했습니다.");
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  };

  const handlePutMyInfo = async (data: UserChangeType) => {
    try {
      start(key);
      await putMyInfo(data);
      setIsTyping(false);
      addToast("프로필 수정에 성공했습니다.", "success");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(error.response?.data.message || "프로필 수정에 실패했습니다.");
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  };

  return (
    <section className="bg-white_FFFFFF px-[16px] py-[16px] rounded-[8px] md:px-[24px] md:py-[24px] md:rounded-[16px]">
      <h1 className="text-2lg text-black_333236 font-bold mb-[40px] md:text-xl md:mb-[24px]">
        프로필
      </h1>

      <form
        className="flex flex-col gap-y-[40px] md:flex-row md:gap-x-[42px]"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col items-center gap-y-[10px]">
          <button
            className="w-[100px] h-[100px] flex justify-center items-center bg-[#F5F5F5] rounded-[6px] md:w-[182px] md:h-[182px]"
            onClick={handleInputClick}
            disabled={isLoading}
          >
            {localProfileImageUrl ? (
              <Image
                src={localProfileImageUrl}
                alt="프로필 이미지"
                width={100}
                height={100}
                className="w-[100px] h-[100px] md:w-[182px] md:h-[182px]"
              />
            ) : (
              <Image
                src={plusIcon}
                alt="더하기"
                width={20}
                height={20}
                className="md:w-[30px] md:h-[30px]"
              />
            )}
          </button>
          {myInfo?.profileImageUrl && (
            <button
              className="flex"
              type="button"
              onClick={() => {
                setLocalProfileImageUrl(null);
                setIsTyping(true);
              }}
              disabled={isLoading}
            >
              프로필 삭제하기
            </button>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-col gap-y-[24px] flex-[9]">
          <div className="flex flex-col gap-y-[16px]">
            <BaseInput
              label="이메일 (변경 불가능)"
              value={myInfo?.email}
              onChange={() => {}}
              mode="profile"
              readonly={true}
            />
            <BaseInput
              mode="profile"
              label="닉네임"
              value={localNickname}
              onChange={(nickname: string) => {
                setLocalNickname(nickname);
                setIsTyping(true);
              }}
              isTyping={isTyping}
            />
          </div>

          <ModalButton
            disabled={isLoading}
            mode="any"
            onClick={() => {
              const updatedData: UserChangeType = {
                nickname: localNickname,
                profileImageUrl: localProfileImageUrl,
              };

              handlePutMyInfo(updatedData);
              updateMyInfo(updatedData);
            }}
          >
            {isLoading ? "저장 중..." : "저장"}
          </ModalButton>
        </div>
      </form>
    </section>
  );
}
