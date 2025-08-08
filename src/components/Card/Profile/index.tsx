"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import plusIcon from "@/assets/plus_icon.svg";
import { BaseInput } from "@/components/common/Input/BaseInput";
import { ModalButton } from "@/components/common/Button/ModalButton";
import { getMyInfo, postProfileImg, putMyInfo } from "@/lib/api/users";
import { useToastStore } from "@/lib/stores/toast";
import { UserChangeType } from "@/types/users";
import { useUserStore } from "@/lib/stores/user";

type ProfileType = {
  email: string;
  nickname: string;
  file: string | null;
};

export function ProfileCard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addToast = useToastStore.getState().addToast;
  const [isSaved, setIsSaved] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const myInfo = useUserStore((state) => state.myInfo);
  const setMyInfo = useUserStore((state) => state.setMyInfo);
  const updateMyInfo = useUserStore((state) => state.updateMyInfo);
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
  }, [myInfo]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyInfo();
        setMyInfo(res.data);
        // setProfile(res.data);
      } catch (error) {
        addToast("내 정보 조회에 실패했습니다.");
      }
    };
    fetchData();
  }, [isSaved]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (!selectedFile) return;

    try {
      const res = await postProfileImg(selectedFile);
      setLocalProfileImageUrl(res.data.profileImageUrl);
      setIsTyping(true);
    } catch (error) {
      addToast("이미지 생성에 실패했습니다.");
    }
  };

  const handlePutMyInfo = async (data: UserChangeType) => {
    try {
      await putMyInfo(data);
      setIsTyping(false);
      setIsSaved((prev) => !prev);
    } catch (error) {
      addToast("내 정보 수정에 실패했습니다.");
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
        <div className="flex flex-col lg:items-center gap-y-[10px]">
          <button
            className="w-[100px] h-[100px] flex justify-center items-center bg-[#F5F5F5] rounded-[6px] md:w-[182px] md:h-[182px]"
            onClick={handleInputClick}
          >
            {localProfileImageUrl ? (
              <Image
                src={localProfileImageUrl}
                alt="프로필 이미지"
                width={100}
                height={100}
                className="md:w-[182px] md:h-[182px]"
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
          <button
            className="flex"
            type="button"
            onClick={() => {
              setLocalProfileImageUrl(null);
              setIsTyping(true);
            }}
          >
            프로필 삭제하기
          </button>
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
                setLocalNickname(nickname); // 👈 전역 말고 로컬 상태만 변경
                setIsTyping(true);
              }}
              isTyping={isTyping}
            />
          </div>

          <ModalButton
            mode="any"
            onClick={() => {
              const updatedData: UserChangeType = {
                nickname: localNickname,
                profileImageUrl: localProfileImageUrl, // ✅ null 또는 이미지 URL 전달
              };

              handlePutMyInfo(updatedData);
              updateMyInfo(updatedData); // 전역 상태 반영
            }}
          >
            저장
          </ModalButton>
        </div>
      </form>
    </section>
  );
}
