export function Dropdown() {
  const dropdownList = ["수정하기", "삭제하기"];

  return (
    <div className="rounded-[6px] px-[6px] py-[6px] border border-gray_D9D9D9 flex flex-col w-[93px]">
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
