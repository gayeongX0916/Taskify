"use client";

import { ColumnCard } from "@/components/Card/Column";
import { AddButton } from "@/components/common/Button/AddButton";
import { CreateColumnModal } from "@/components/Modal/CreateColumn";
import { useState } from "react";

const dashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const exampleList = [
    {
      count: 3,
      name: "To Do",
    },
    { count: 2, name: "On Progress" },
    { count: 3, name: "Done" },
    { count: 3, name: "HI" },
    { count: 3, name: "Bye" },
  ];
  return (
    <main className="bg-gray_FAFAFA min-h-screen">
      <CreateColumnModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex flex-col pb-[20px] lg:flex-row lg:overflow-x-auto">
        <div className="flex flex-col lg:flex-row">
          {exampleList.map(({ count, name }) => (
            <ColumnCard key={name} count={count} columnName={name} />
          ))}
        </div>
        <div className="px-[12px] pt-[16px] pb-[49px] md:py-[20px] md:px-[20px] lg:pt-[68px] lg:pb[0] lg:pl-[20px] lg:pr-[100px]">
          <AddButton
            mode="column"
            className="w-full font-bold py-[20px] lg:w-[354px]"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
    </main>
  );
};

export default dashboardPage;
