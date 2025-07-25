import { getInitialFromUserName, getRandomColor } from "@/utils/randomColor";

type AvatarProps = {
  username: string;
};

export function Avatar({ username }: AvatarProps) {
  const initial = getInitialFromUserName(username);
  const bgColor = getRandomColor(initial);

  return (
    <div
      className={
        "rounded-full flex items-center justify-center text-white text-md md:text-lg w-[34px] h-[34px] font-semibold border-2 border-white_FFFFFF md:w-[38px] md:h-[38px]"
      }
      style={{ backgroundColor: bgColor }}
    >
      {initial}
    </div>
  );
}
