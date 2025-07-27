"use client";

import { useState } from "react";

type DefaultInputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  mode: "any" | "profile";
};

export function BaseInput({
  label,
  placeholder,
  value,
  onChange,
  mode,
}: DefaultInputProps) {
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    onChange?.(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-[8px]">
      <span className="text-md text-black_333236 md:text-lg">{label}</span>
      <input
        className={`px-[16px] py-[12px] rounded-[8px] border border-gray_D9D9D9 text-lg w-full ${
          mode==='profile' ? !isTyping && value ? "text-gray_9FA6B2" : "text-black_333236" : "text-black_333236"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
