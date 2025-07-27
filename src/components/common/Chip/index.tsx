type ChipProps = {
  name: string;
};

export function Chip({ name }: ChipProps) {
  return (
    <div className="flex w-fit items-center gap-x-[9px] bg-violet_8P rounded-[16px] px-[10px] py-[4px]">
      <div className="w-[6px] h-[6px] bg-violet_5534DA rounded-full"></div>
      <span className="text-violet_5534DA text-md whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}
