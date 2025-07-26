import { useEffect, useRef } from "react";

type ActionDropdownProps = {
  setShowDropdown: (showDropdown: boolean) => void;
};

export function ActionDropdown({ setShowDropdown }: ActionDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownList = ["수정하기", "삭제하기"];

  const handleClickOutSide = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="rounded-[6px] bg-white_FFFFFF px-[6px] py-[6px] border border-gray_D9D9D9 flex flex-col w-[93px]"
    >
      {dropdownList.map((list) => (
        <button
          key={list}
          className="text-md text-black_333236 hover:bg-violet_8P hover:text-violet_5534DA hover:rounded-[4px]"
        >
          {list}
        </button>
      ))}
    </div>
  );
}
