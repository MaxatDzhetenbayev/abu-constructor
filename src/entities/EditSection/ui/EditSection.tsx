import React from "react";

import { Input } from "@/shared/ui";

import { IEditSectionProps } from "../model/EditSection.inferface";

export const EditSection = ({ inputList }: IEditSectionProps) => {
  return (
    <section className="flex flex-col md:flex-row gap-3">
      {inputList.map((item: any) => {
        return (
          <Input
            key={item.id}
            label={item.label}
            type={item.type}
            value={item.value}
            onChange={(e) => item.onChange(e.target.value)}
          />
        );
      })}
    </section>
  );
};
