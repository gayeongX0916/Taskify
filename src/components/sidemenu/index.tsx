import Image from "next/image";
import logoTitlePurple from "@/assets/logo_title_purple.svg";
import logoPurple from "@/assets/logo_purple.svg";
import addBoxIcon from "@/assets/add_box.svg";
import crownIcon from "@/assets/crown.svg";

const colorMap: Record<string, string> = {
  green: "bg-green_7AC555",
  purple: "bg-purple_760DDE",
  orange: "bg-orange_FFA500",
  blue: "bg-blue_76A5EA",
  pink: "bg-pink_E876EA",
};

const exampleList = [
  { color: "green", name: "비브리지", isOwner: true },
  { color: "purple", name: "코드잇", isOwner: true },
  { color: "orange", name: "3분기 계획", isOwner: false },
  { color: "blue", name: "회의록", isOwner: false },
  { color: "pink", name: "중요 문서함", isOwner: false },
];

// md:min-w-[160px] md:w-full

export function SideMenu() {
  return (
    <nav className="md:w-[160px] lg:w-[300px] pt-[20px] pl-[8px] pr-[12px] pb-[96px]">
      <header className="mb-[38px] flex justify-center md:mb-[56px] lg:justify-start">
        <Image src={logoTitlePurple} alt="로고" className="hidden md:flex" />
        <Image src={logoPurple} alt="모바일 로고" className="flex md:hidden" />
      </header>
      <section className="flex flex-col gap-y-[22px] md:gap-y-[16px]">
        <div className="flex justify-center md:justify-between md:items-center">
          <span className="hidden md:block md:text-xs md:text-gray_787486">
            Dash Boards
          </span>
          <button>
            <Image src={addBoxIcon} alt="추가" width={20} height={20} />
          </button>
        </div>
        <ul className="flex flex-col items-center md:gap-y-[8px] md:items-start gap-y-[6px]">
          {exampleList.map((item) => (
            <li key={item.name}>
              <button className="flex w-[40px] h-[40px] justify-center items-center md:w-full md:gap-x-[16px] lg:px-[12px] lg:py-[8px] md:hover:bg-violet_8P md:px-[10px] md:justify-start">
                <div
                  className={`${
                    colorMap[item.color]
                  } rounded-full w-[8px] h-[8px]`}
                ></div>
                <div className="hidden md:flex md:gap-x-[6px]">
                  <span>{item.name}</span>
                  {item.isOwner && <Image src={crownIcon} alt="주인" />}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
}
