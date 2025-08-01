import { colorList } from "@/lib/utils/dashboardColor";
import Image from "next/image";
import { useState } from "react";
import checkIcon from "@/assets/white_check_icon.svg";
import { ModalButton } from "@/components/common/Button/ModalButton";

type EditDashboardCardProps = {
  title: string;
};

export function EditDashboardCard({ title }: EditDashboardCardProps) {
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  return (
    <section className="bg-white_FFFFFF px-[16px] py-[20px] rounded-[8px] md:px-[28px] md:py-[32px] md:rounded-[16px]">
      <h1 className="text-xl text-black_333236 mb-[24px] font-bold md:text-2xl">
        {title}
      </h1>
      <form className="flex flex-col">
        <div className="flex flex-col gap-y-[8px] mb-[16px]">
          <label htmlFor="dashboard-name" className="text-lg text-black_333236">
            대시보드 이름
          </label>
          <input
            id="dashboard-name"
            className="px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9 w-full h-[40px] md:h-[50px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex gap-x-[8px]">
          {colorList.map((list) => (
            <button
              key={list}
              type="button"
              onClick={() => setColor(list)}
              className={`bg-${list} w-[30px] h-[30px] rounded-full flex justify-center items-center`}
            >
              {color === list && <Image src={checkIcon} alt="체크" />}
            </button>
          ))}
        </div>

        <footer className="mt-[32px]">
          <ModalButton mode="any">변경</ModalButton>
        </footer>
      </form>
    </section>
  );
}
