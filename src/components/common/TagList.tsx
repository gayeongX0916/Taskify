import { getTagColor } from "@/lib/utils/getTagColor";
import React from "react";

type TagListProps = {
  tags: string[];
  className?: string;
  isButton?: boolean;
  onClickTag?: (tag: string) => void;
};

function TagList({
  tags,
  className,
  isButton = false,
  onClickTag,
}: TagListProps) {
  return (
    <ul className={`flex items-center flex-wrap ${className ?? "gap-x-[6px]"}`}>
      {tags.map((tag) => {
        const color = getTagColor(tag);
        const commonStyle = {
          backgroundColor: color.bg,
          color: color.text,
        };

        return (
          <li key={tag}>
            {isButton ? (
              <button
                key={tag}
                onClick={() => onClickTag?.(tag)}
                className="rounded-[4px] px-[6px] py-[2px] text-md"
                style={commonStyle}
              >
                {tag}
              </button>
            ) : (
              <span
                key={tag}
                className="rounded-[4px] px-[6px] py-[4px] text-md"
                style={commonStyle}
              >
                {tag}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default React.memo(TagList);
