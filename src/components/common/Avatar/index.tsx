import { getInitialFromUserName, getRandomColor } from "@/utils/randomColor";

type AvatarProps = {
  username: string;
  className?: string;
};

export function Avatar({ username, className }: AvatarProps) {
  const initial = getInitialFromUserName(username);
  const bgColor = getRandomColor(initial);

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-medium border-2 border-white_FFFFFF ${
        className ??
        "w-[34px] h-[34px] md:w-[38px] md:h-[38px] text-md md:text-lg"
      }`}
      style={{ backgroundColor: bgColor }}
    >
      {initial}
    </div>
  );
}
