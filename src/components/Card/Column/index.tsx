import Image from "next/image";
import settingIcon from "@/assets/setting_icon.svg";
import { AddButton } from "@/components/common/Button/AddButton";
import { ColumnDetailCard } from "../ColumnDetail";
import exampleIcon from "@/assets/crown.svg";
import { EditColumnModal } from "@/components/Modal/Base/EditColumnModal";
import { CreateTodoModal } from "@/components/Modal/CreateTodo";
import { DashBoardModal } from "@/components/Modal/Dashboard";
import { useState } from "react";

type ColumnCardProps = {
  count: number;
  columnName: string;
};

type ModalName = "editColumn" | "createTodo" | "dashboard";

export function ColumnCard({ count, columnName }: ColumnCardProps) {
  const [modalState, setModalState] = useState({
    editColumn: false,
    createTodo: false,
    dashboard: false,
  });

  const exampleList = [
    {
      img: exampleIcon,
      title: "새로운",
      tags: ["프로젝트", "백엔드", "프론트"],
      username: "김가영",
      date: new Date(),
    },
    {
      title: "새로운",
      tags: ["프로젝트", "백엔드", "프론트", "aksdir", "dkd", "skdksl"],
      username: "김가영",
      date: new Date(),
    },
    {
      img: exampleIcon,
      title: "새로운",
      tags: ["프로젝트", "백엔드", "프론트"],
      username: "김가영",
      date: new Date(),
    },
  ];

  const handleClickOpen = (modalName: ModalName) => {
    setModalState((prev) => ({ ...prev, [modalName]: true }));
  };

  const handleClickClose = (modalName: ModalName) => {
    setModalState((prev) => ({ ...prev, [modalName]: false }));
  };

  return (
    <section className="py-[16px] px-[12px] md:py-[20px] md:px-[20px] flex flex-col border-b border-gray_EEEEEE lg:border-b-0 lg:border-r lg:min-w-[354px]">
      <EditColumnModal
        isOpen={modalState.editColumn}
        onClose={() => handleClickClose("editColumn")}
      />
      <CreateTodoModal
        isOpen={modalState.createTodo}
        onClose={() => handleClickClose("createTodo")}
      />
      <DashBoardModal
        isOpen={modalState.dashboard}
        onClose={() => handleClickClose("dashboard")}
      />
      <header className="flex items-center justify-between mb-[24px]">
        <div className="flex items-center gap-x-[8px]">
          <div className="w-[8px] h-[8px] bg-violet_5534DA rounded-full"></div>
          <div className="flex items-center gap-x-[12px]">
            <h1 className="text-lg font-bold md:text-2lg">{columnName}</h1>
            <span className="bg-gray_EEEEEE rounded-[4px] px-[6px] py-[3px] text-xs text-gray_787486">
              {count}
            </span>
          </div>
        </div>

        <button onClick={() => handleClickOpen("editColumn")}>
          <Image
            src={settingIcon}
            alt="컬럼 관리"
            width={22}
            height={22}
            className="md:w-[24px] md:h-[24px]"
          />
        </button>
      </header>

      <div className="mb-[10px]">
        <AddButton
          mode="todo"
          className="w-full h-[32px] md:h-[40px] py-[6px] md:py-[9px]"
          onClick={() => handleClickOpen("createTodo")}
        />
      </div>
      <div className="flex flex-col md:gap-y-[16px]">
        {exampleList.map(({ img, title, tags, username, date }, idx) => (
          <div
            role="button"
            key={idx}
            className={`${idx > 0 ? "hidden md:block" : ""}`}
            onClick={() => handleClickOpen("dashboard")}
          >
            <ColumnDetailCard
              img={img}
              title={title}
              tags={tags}
              username={username}
              date={date}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
