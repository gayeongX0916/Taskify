import { getTagColor } from "@/utils/getTagColor";

type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  return (
    <ul className="flex items-center gap-x-[6px]">
      {tags.map((tag) => {
        const color = getTagColor(tag);
        return (
          <li
            key={tag}
            className="rounded-[4px] px-[6px] py-[2px] text-md"
            style={{ backgroundColor: color.bg, color: color.text }}
          >
            {tag}
          </li>
        );
      })}
    </ul>
  );
}
