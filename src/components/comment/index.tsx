import { Avatar } from "../common/Avatar";

type CommentProps = {
  name: string;
  date: string;
  des: string;
};

export function Comment({ name, date, des }: CommentProps) {
  const handleonEdit = () => {};
  const handleonDelete = () => {};

  const buttonList = [
    {
      label: "수정",
      onClick: handleonEdit,
    },
    { label: "삭제", onClick: handleonDelete },
  ];

  return (
    <div className="flex gap-x-[10px]">
      <Avatar
        username={name}
        className="w-[26px] h-[26px] md:w-[34px] md:h-[34px] text-xs md:text-lg"
      />

      <div className="flex flex-col gap-y-[6px] w-full">
        <div className="flex gap-x-[8px] items-center">
          <span className="text-xs md:text-md font-semibold text-black_333236">
            {name}
          </span>

          <time
            className="text-xs text-gray_9FA6B2"
            dateTime={new Date(date).toISOString()}
          >
            {date}
          </time>
        </div>

        <p className="text-xs md:text-md text-black_333236">{des}</p>

        <div className="flex gap-x-[14px]">
          {buttonList.map(({ label, onClick }) => (
            <button
              key={label}
              className="text-xxs md:text-xs text-gray_9FA6B2 underline"
              onClick={onClick}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
