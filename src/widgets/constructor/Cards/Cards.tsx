import clsx from "clsx";
import { Card } from "./Card";
import { IWidgetProps } from "@/shared/types";

enum CardVariant {
  BASE = "base",
  WITH_MODAL = "with_modal",
  WITH_FILE = "with_file",
  HOVER_ANIMATION = "hover_animation",
}

function Cards({
  contents,
  options: { content, variant, size, count_of_row = "300px" },
  locale,
}: IWidgetProps) {



  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">
        {content?.[locale]?.title.toLocaleUpperCase()}
      </h2>
      {

        <div
          className={clsx(
            variant == CardVariant.BASE ||
              variant == CardVariant.WITH_MODAL ||
              variant == CardVariant.WITH_FILE ||
              variant == CardVariant.HOVER_ANIMATION
              ? `grid gap-2`
              : "flex flex-col gap-2",
            "mt-2"
          )}
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${count_of_row}, 1fr))` }}
        >
          {contents.map(({ content }, idx) => (
            <Card
              key={idx}
              variant={variant}
              content={content}
              locale={locale}
              size={size}
            />
          ))}
        </div>
      }

    </section>
  );
}

Cards.displayName = "Cards";
export default Cards;
