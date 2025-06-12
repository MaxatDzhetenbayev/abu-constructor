import { FileArchive } from "lucide-react";

import { backendImageUrl } from "@/shared/lib/constants";

import { ListItem } from "./ListItem";
interface ListItem {
  file: string;
  content: string;
}
export interface ListProps {
  items: ListItem[];
}
function List({
  contents,
  options: { content },
  locale,
}: {
  contents: Array<any>;
  options: any;
  locale: string;
}) {
  return (
    <section className="flex flex-col gap-5  h-full">
      <h2 className="text-3xl font-bold text-abu_primary">
        {content?.[locale]?.title}
      </h2>
      <ul className="flex flex-col  gap-2">
        {contents.map(({ content }, idx) => {
          const filePath = content?.image?.[locale] || content?.image?.ru;

          return (
            <ListItem
              key={idx}
              icon={<FileArchive className="w-7 h-9" />}
              href={`${backendImageUrl}${filePath}`}
            >
              <div>{content[locale].title}</div>
            </ListItem>
          );
        })}
      </ul>
    </section>
  );
}

List.displayName = "List";
export default List;
