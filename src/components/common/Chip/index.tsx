import React from "react";

type ChipProps = {
  name: string;
  className?: string;
};

function Chip({ name, className }: ChipProps) {
  return (
    <div className="flex w-fit items-center gap-x-[9px] bg-violet_8P rounded-[16px] px-[10px] py-[4px]">
      <div className="w-[6px] h-[6px] bg-violet_5534DA rounded-full"></div>
      <span
        className={`text-violet_5534DA whitespace-nowrap ${
          className ?? "text-md"
        }`}
      >
        {name}
      </span>
    </div>
  );
}

export default React.memo(Chip);
