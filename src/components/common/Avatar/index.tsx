import {
  getInitialFromUserName,
  getRandomColor,
} from "@/lib/utils/randomColor";
import Image from "next/image";

type AvatarProps = {
  username: string;
  className?: string;
  profileImageUrl?: string;
};

export function Avatar({ username, className, profileImageUrl }: AvatarProps) {
  const initial = getInitialFromUserName(username);
  const bgColor = getRandomColor(initial);

  return (
    <>
      {profileImageUrl ? (
        <Image
          src={profileImageUrl}
          alt="프로필"
          width={34}
          height={34}
          className="md:w-[38px] md:h-[38px]"
        />
      ) : (
        <div
          className={`rounded-full flex items-center justify-center text-white font-medium border-2 border-white_FFFFFF ${
            className ??
            "w-[34px] h-[34px] md:w-[38px] md:h-[38px] text-md md:text-lg"
          }`}
          style={{ backgroundColor: bgColor }}
        >
          {initial}
        </div>
      )}
    </>
  );
}
