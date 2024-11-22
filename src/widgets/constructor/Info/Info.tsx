import { backendImageUrl } from "@/shared/lib/constants";
import Image from "next/image";

export interface InfoItemProps {
  image: string;
  imagePosition: string;
  href: string;
  title: string;
  content: string;
  linkText: string;
}
function Info({
  options: { content },
  locale,
}: {
  options: any;
  locale: string;
}) {
  return (
    <section className="flex  flex-col">
      <h2 className="text-2xl font-bold text-[#690000]">
        {content[locale]?.title}
      </h2>
      <section className="flex p-10 flex-row  gap-14 shadow-[0_0_30px_0px_rgba(0,0,0,0.05)] rounded-2xl  bg-white mt-4 ">
        <section className="relative w-[400px] h-[363px]">
          <Image
            src={`${backendImageUrl}${content.image}`}
            fill
            objectFit="cover"
            alt="image"
            className="rounded-2xl"
          />
        </section>
        <section className="flex flex-col gap-10">
          <h2 className="font-bold text-2xl">{content[locale]?.full_name}</h2>
          <div
            className="quill-content"
            dangerouslySetInnerHTML={{ __html: content[locale].content }}
          ></div>
        </section>
      </section>
    </section>
  );
}
Info.displayName = "Info";
export default Info;
