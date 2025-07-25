type TagInputProps = {
  label: string;
  placeholder?: string;
};

export function TagInput({ label, placeholder }: TagInputProps) {
  return (
    <div className="flex flex-col gap-y-[8px]">
      <span className="text-lg text-black_333236">{label}</span>
      <input
        className="px-[16px] py-[12px] rounded-[8px] border border-gray_D9D9D9"
        placeholder={placeholder}
      />
      <button>태그 내용들</button>
    </div>
  );
}
