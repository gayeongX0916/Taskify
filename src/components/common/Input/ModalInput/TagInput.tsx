import { getTagColor } from "@/utils/getTagColor";
import { useState } from "react";
import { TagList } from "../../TagList";

type TagInputProps = {
  label: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
};

export function TagInput({
  label,
  placeholder,
  value,
  onChange,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleDeleteClick = (tagToDelete: string) => {
    const newValue = value.filter((item) => item !== tagToDelete);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-y-[8px]">
      <span className="text-lg text-black_333236">{label}</span>
      <input
        className="px-[16px] py-[12px] rounded-[8px] border border-gray_D9D9D9"
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      <TagList
        tags={value}
        isButton={true}
        onClickTag={handleDeleteClick}
        className="gap-x-[10px] gap-y-[10px]"
      />
    </div>
  );
}
