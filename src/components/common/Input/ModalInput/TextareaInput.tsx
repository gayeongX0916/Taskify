type TextareaInputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
};

export function TextareaInput({
  label,
  placeholder,
  value,
  onChange,
}: TextareaInputProps) {
  return (
    <div className="flex flex-col gap-y-[8px]">
      <span className="text-md text-black_333236 md:text-lg">{label}</span>
      <textarea
        placeholder={placeholder}
        className="px-[16px] py-[12px] rounded-[8px] border border-gray_D9D9D9 text-lg resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
