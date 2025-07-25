import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "@/assets/calendar_icon.svg";
import Image from "next/image";

type DateInputProps = {
  label: string;
  placeholder?: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
};

export function DateInput({
  label,
  placeholder,
  value,
  onChange,
}: DateInputProps) {
  return (
    <div className="flex flex-col gap-y-[8px]">
      <span className="text-md text-black_333236 md:text-lg">{label}</span>
      <div className="relative w-full [&_.react-datepicker-wrapper]:w-full">
        <DatePicker
          placeholderText={placeholder}
          className="pl-[40px] pr-[16px] py-[12px] rounded-[8px] border border-gray_D9D9D9 w-full"
          dateFormat="yyyy-MM-dd HH:mm"
          showTimeSelect
          selected={value}
          onChange={onChange}
        />
        <Image
          src={calendarIcon}
          alt="달력"
          className="absolute left-[12px] top-1/2 -translate-y-1/2"
          width={22}
          height={22}
        />
      </div>
    </div>
  );
}
