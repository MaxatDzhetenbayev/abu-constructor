"use client";
import clsx from "clsx";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";

import { backendUrl } from "@/shared/lib/constants";
import { IWidgetProps } from "@/shared/types";
import { getWidgetByName } from "@/widgets";

import { useQuery } from "@tanstack/react-query";

export function StepSwitcherClient({
  contents,
  options: { content },
  locale,
}: IWidgetProps): React.JSX.Element {
  const currentPath = usePathname();
  const currentLocale = useParams().locale;
  const currentSlug = currentPath.replace(`/${currentLocale}/`, "");
  const [activeStep, setActiveStep] = useState(() => contents[0].content.link);

  const { data, isSuccess } = useQuery({
    queryKey: ["step-switcher", activeStep],
    queryFn: async () => {
      const response = await fetch(
        `${backendUrl}/navigations/find/by-slug?slug=${currentSlug}/${activeStep}`
      );
      return response.json();
    },
  });

  function viewWidgets(widget_type: string, widgetOptons: any) {
    return getWidgetByName(widget_type, widgetOptons);
  }
  return (
    <section>
      <h2 className="text-calc-xl font-bold text-abu_primary">
        {content[locale]?.title}
      </h2>
      <section className="flex flex-col mt-5">
        <section className={
          clsx(
            "flex gap-4 bg-abu_primary px-5 rounded-xl max-md:flex-col max-md:px-0 overflow-hidden",
          )
        }>
          {contents.map(({ content }) => {
            return (
              <button
                className={clsx(
                  "py-4 flex-1 font-bold text-calc-md text-center  md:border-b-4 border-transparent text-white ",
                  activeStep === content.link ? " border-white max-md:bg-abu_primary_hover" : ""
                )}
                key={content[locale].title}
                onClick={() => setActiveStep(content.link)}
              >
                <h3 className="">
                  {content[locale]?.title}
                </h3>
              </button>
            );
          })}
        </section>
        <section className="mt-10 md:mt-20 flex flex-col  gap-10">
          {isSuccess ? (
            <>
              {data.widgets?.map(
                ({ widget_type, options, contents }: any, idx: number) => {
                  const widgetOptons = { contents, options, locale: locale };
                  return (
                    <React.Fragment key={idx + widget_type}>
                      {viewWidgets(widget_type, widgetOptons)}
                    </React.Fragment>
                  );
                }
              )}
            </>
          ) : null}
        </section>
      </section>
    </section >
  );
}
