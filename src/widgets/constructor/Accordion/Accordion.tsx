import { AccordionItem } from './ui/AccordionItem'

function Accordion({
  contents,
  options,
  locale,
}: {
  contents: any;
  options: any;
  locale: string;
}) {

  return (
    <section className="mt-7">
      <h2 className="text-2xl font-bold text-[#690000]">
        {options?.content && options?.content[locale].title}
      </h2>
      <ul className="flex flex-col gap-3">
        {contents.map(({ content }: any, idx: number) => {

          return (
            <AccordionItem body={content[locale].content} title={content[locale].title} />
          );
        })}
      </ul>
    </section>
  );
}
Accordion.displayName = "Accordion";
export default Accordion;
