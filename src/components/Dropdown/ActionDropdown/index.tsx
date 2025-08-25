import { useCallback, useEffect, useRef } from "react";

type ActionDropdownProps = {
  setShowDropdown: (showDropdown: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
  isLoading: boolean;
};

export function ActionDropdown({
  setShowDropdown,
  onEdit,
  onDelete,
  isLoading,
}: ActionDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownList = [
    { label: "수정하기", onClick: onEdit },
    { label: "삭제하기", onClick: onDelete },
  ];

  const handleClickOutSide = useCallback(
    (e: MouseEvent) => {
      const el = dropdownRef.current;
      if (el && !el.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    },
    [setShowDropdown]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [handleClickOutSide]);

  return (
    <div
      ref={dropdownRef}
      className="rounded-[6px] bg-white_FFFFFF px-[6px] py-[6px] border border-gray_D9D9D9 flex flex-col w-[93px]"
    >
      {dropdownList.map(({ label, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          disabled={isLoading}
          className="text-md text-black_333236 hover:bg-violet_8P hover:text-violet_5534DA hover:rounded-[4px]"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
