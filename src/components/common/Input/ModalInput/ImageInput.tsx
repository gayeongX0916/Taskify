import Image from "next/image";
import { useRef, useState } from "react";
import plusIcon from "@/assets/plus_icon.svg";
import { postCardImg } from "@/lib/api/columns";
import { useToastStore } from "@/lib/stores/toast";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";

type ImageInputProps = {
  label: string;
  columnId: number;
  onChange: (url: string) => void;
  initialUrl?: string;
};

export function ImageInput({
  label,
  columnId,
  onChange,
  initialUrl,
}: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addToast = useToastStore.getState().addToast;
  const key = "ImageInput";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const [file, setFile] = useState(initialUrl || "");

  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (!selectedFile) return;

    try {
      start(key);
      const res = await postCardImg({ columnId, image: selectedFile });
      setFile(res.data.imageUrl);
      onChange(res.data.imageUrl);
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

  return (
    <div className="flex flex-col gap-y-[8px]">
      <span className="text-lg text-black_333236">{label}</span>
      <div className="flex gap-x-[20px]">
        <button
          className="w-[76px] h-[76px] bg-[#F5F5F5] flex justify-center items-center"
          onClick={handleInputClick}
          disabled={isLoading}
        >
          {file ? (
            <Image src={file} alt="미리보기" width={76} height={76} />
          ) : (
            <Image src={plusIcon} alt="추가" width={28} height={28} />
          )}
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      {file && (
        <button
          type="button"
          className="text-red-500 underline text-sm self-start"
          onClick={() => {
            setFile(""); 
            onChange(""); 
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        >
          이미지 삭제하기
        </button>
      )}
    </div>
  );
}
