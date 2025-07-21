import Image from "next/image";

import { backendImageUrl } from "@/shared/lib/constants";

export interface InfoItemProps {
  image: string;
  content: string;
}
function Info({
  options: { content },
  locale,
}: {
  options: any;
  locale: string;
}) {
  const { post, full_name, content: body } = content[locale];
  const filePath = content?.image?.[locale] || content?.image?.ru;
  return (
    <section className="flex flex-col">
      <h2 className="text-2xl font-bold text-font_primary">
        {content[locale]?.title}
      </h2>
      <section className="flex p-5  flex-col lg:flex-row gap-4 md:gap-7 lg:gap-14 shadow-[0_0_30px_0px_rgba(0,0,0,0.05)] rounded-2xl bg-white mt-4 ">
        <section className="relative max-w-[400px] w-full h-[30vh] sm:h-[363px] sm:mx-auto">
          <Image
            src={
              content.image
                ? `${backendImageUrl}${filePath}`
                : "/images/placeholder.jpg"
            }
            fill
            priority
            objectFit="cover"
            alt="image"
            className="rounded-2xl"
          />
        </section>
        <section className="flex flex-1 py-5 flex-col gap-4 md:gap-7 ">
          <div>
            <p className="text-font_primary font-bold text-calc-md">{post}</p>
            <h2 className="font-bold text-calc-xl">{full_name}</h2>
          </div>
          <div
            className="quill-content max-h-[235px] overflow-hidden"
            dangerouslySetInnerHTML={{ __html: body }}
          ></div>
        </section>
      </section>
    </section>
  );
}

Info.displayName = "Info";
export default Info;
