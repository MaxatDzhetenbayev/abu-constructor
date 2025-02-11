import { Dispatch, SetStateAction } from "react";
import { Controller, UseFormRegister } from "react-hook-form";

import { locales } from "@/i18n";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import JoditEditorComponent from "@/shared/ui/quill-editor";
import { FileUploader } from "@/widgets/common/FileUploader";

export const viewInputByType = (
  type: string,
  options: any,
  register: UseFormRegister<any>,
  control: any,
  setIsUploading?: Dispatch<SetStateAction<boolean>>
) => {
  switch (type) {
    case "text":
      return (
        <section className="flex flex-col gap-3 border p-5">
          <p>{options.placeholder}</p>
          <section className="flex  gap-3">
            {locales.map((locale) => (
              <Input
                key={locale}
                label={options.placeholder + ` (${locale})`}
                {...register(`content.${locale}.${options.props}`)}
                className="flex-grow"
              />
            ))}
          </section>
        </section>
      );
    case "quill":
      return (
        <section className="flex flex-col gap-3 border p-5">
          <p>{options.placeholder}</p>
          <section className="grid gap-3 grid-cols-1 xl:grid-cols-3">
            {locales.map((locale) => (
              <Controller
                key={locale}
                name={`content.${locale}.${options.props}`}
                control={control}
                render={({ field }) => (
                  <JoditEditorComponent
                    key={locale}
                    label={options.placeholder + ` (${locale})`}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            ))}
          </section>
        </section>
      );
    case "select": {
      return (
        <section className="flex flex-col gap-3 border p-5">
          <p>{options.placeholder}</p>
          <Controller
            name={options.props}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Выберите вид" />
                </SelectTrigger>
                <SelectContent>
                  {options.values.map(
                    ({ value, label }: { value: string; label: string }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </section>
      );
    }
    case "file":
      return (
        <Controller
          name={`content.${options.props}`}
          control={control}
          render={({ field }) => (
            <FileUploader
              label={options.placeholder ?? ""}
              field={options.props}
              id={field.name}
              file={field.value}
              setIsUploading={setIsUploading}
              onChange={(val) => {
                field.onChange(val);
                return;
              }}
            />
          )}
        />
      );
    default:
      return null;
  }
};
