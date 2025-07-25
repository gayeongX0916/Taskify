import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateInputProps = {
  label: string;
  placeholder?: string;
};

export function DateInput({ label, placeholder }: DateInputProps) {
  return (
    <div className="flex flex-col gap-y-[8px]">
      <span className="text-md text-black_333236 md:text-lg">{label}</span>
      <DatePicker />
      {/* <input
        type="datetime-local"
        className="px-[16px] py-[12px] rounded-[8px] border border-gray_D9D9D9"
        placeholder={placeholder}
      /> */}
    </div>
  );
}
