"use client";

import { useEffect, useState } from "react";
import { Avatar } from "../../Avatar";

type InvitedUserListProps = {
  users: string[];
};

export function InvitedUserList({ users }: InvitedUserListProps) {
  const [maxVisible, setMaxVisible] = useState(4);
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = users.length - maxVisible;

  useEffect(() => {
    const updateMaxVisible = () => {
      const width = window.innerWidth;
      if (width < 1200) {
        setMaxVisible(2);
      } else {
        setMaxVisible(4);
      }
    };

    updateMaxVisible();
    window.addEventListener("resize", updateMaxVisible);

    return () => {
      window.removeEventListener("resize", updateMaxVisible);
    };
  }, []);

  return (
    <div className="flex -space-x-2">
      {visibleUsers.map((user, index) => (
        <Avatar key={index} username={user} />
      ))}

      {remainingCount > 0 && (
        <div className="w-[34px] h-[34px] rounded-full text-md lg:text-lg md:w-[38px] md:h-[38px] text-[#D25B68] bg-[#F4D7DA] border-2 border-white_FFFFFF flex justify-center items-center font-semibold">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
