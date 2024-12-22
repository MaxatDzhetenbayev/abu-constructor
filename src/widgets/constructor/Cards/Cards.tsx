import clsx from "clsx";

import { IWidgetProps } from "@/shared/types";

import { Card } from "./Card";

function Cards({
  contents,
  options: { content, variant },
  locale,
}: IWidgetProps) {
  const flexStyles: string = calculateFlexBasis(contents.length);

  return (
    <section className="flex flex-col gap-3">
      {content?.[locale]?.title && (
        <h2 className="text-3xl font-bold text-abu_primary">
          {content[locale].title}
        </h2>
      )}
      {
        <div className={clsx("flex gap-5 flex-wrap ", "mt-2")}>
          {contents.map(({ content }, idx) => (
            <Card
              key={idx}
              variant={variant}
              content={content}
              locale={locale}
              styles={flexStyles}
            />
          ))}
        </div>
      }
    </section>
  );
}

Cards.displayName = "Cards";
export default Cards;

function calculateFlexBasis(elementCount: number = 376): string {
  let styles: string = "";

  if (elementCount % 4 === 0) {
    styles += "basis-[250px]";
  } else {
    styles += "basis-[376px]";
  }

  if (elementCount % 2 === 0) {
    styles += " xl:max-w-[600px]";
  }

  return styles;
}
