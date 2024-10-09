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


  console.log(content)

  return (
    <section className="flex flex-col">
      <h2 className="text-2xl font-bold text-[#690000]">
        {content[locale]?.title}
      </h2>
      <section className="flex flex-col md:flex-row  gap-4 shadow-xl rounded-md  p-5 bg-white mt-4 ">
        <section className="flex flex-col gap-1 w-[100%] md:w-[35%]">
          <section className="relative w-[100%] h-[350px]">
            <Image
              src={`${backendImageUrl}${content.image}`}
              fill
              objectFit="cover"
              objectPosition="center"
              alt="image"
              className="rounded-md"
            />
          </section>
          <h2 className="text-center font-bold text-[20px]">{content[locale]?.full_name}</h2>
        </section>
        <section className="w-[100%] md:w-[65%] quill-content" dangerouslySetInnerHTML={{ __html: content[locale].content }}></section>
      </section>
    </section>
  );
}
Info.displayName = "Info";
export default Info;
