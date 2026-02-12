"use client";

import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { backendUrl } from "@/shared/lib/constants";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Textarea,
} from "@/shared/ui";
import { toast } from "@/shared/ui/use-toast";

type AnswerType = "phone" | "email";

interface RectorAppealFormState {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  answerType: AnswerType;
}

export default function RectorBlogPage() {
  const t = useTranslations("rectorBlog");

  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Appeal to Rector */}
      <section className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-abu_primary">
          {t("appeal.title")}
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-lg mb-4">{t("appeal.intro")}</p>
          <p className="text-base">{t("appeal.signature")}</p>
          <p className="text-base font-semibold">{t("appeal.name")}</p>
        </div>
        <RectorAppealForm />
      </section>

      <Separator />

      {/* Contacts */}
      <section className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-abu_primary">
          {t("contacts.title")}
        </h2>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-4">
            <Phone className="w-5 h-5 text-abu_primary flex-shrink-0" />
            <a
              href={`tel:${t("contacts.phone").replace(/\s/g, "")}`}
              className="text-lg hover:underline block flex items-center"
            >
              {t("contacts.phone")}
            </a>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Mail className="w-5 h-5 text-abu_primary flex-shrink-0" />
            <a
              href={`mailto:${t("contacts.email")}`}
              className="text-lg hover:underline block flex items-center"
            >
              {t("contacts.email")}
            </a>
          </div>
          <div className="mt-2">
            <p className="text-lg">{t("contacts.receptionDays")}</p>
            <p className="text-lg">{t("contacts.receptionTime")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const RectorAppealForm = () => {
  const t = useTranslations("rectorBlog");
  const [form, setForm] = useState<RectorAppealFormState>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    answerType: "phone",
  });

  const handleFieldChange =
    (field: keyof RectorAppealFormState) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const { value } = event.target;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleAnswerTypeChange = (value: string) => {
    setForm((prev) => ({ ...prev, answerType: value as AnswerType }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: Record<string, unknown> = {
      appeal_type: "rector",
      text: form.message,
    };

    if (form.fullName) {
      payload.full_name = form.fullName;
    }
    if (form.email) {
      payload.email = form.email;
    }
    if (form.phone) {
      payload.phone = form.phone;
    }
    if (form.answerType) {
      payload.answer_type = form.answerType;
    }

    fetch(`${backendUrl}/appeals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send appeal");
        }

        toast({
          title: t("appeal.form.successTitle"),
          description: t("appeal.form.successDescription"),
        });

        setForm({
          fullName: "",
          email: "",
          phone: "",
          message: "",
          answerType: "phone",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: t("appeal.form.errorTitle"),
          description: t("appeal.form.errorDescription"),
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label={t("appeal.form.fullName")}
          value={form.fullName}
          onChange={handleFieldChange("fullName")}
          required
        />
        <Input
          type="email"
          label={t("appeal.form.email")}
          value={form.email}
          onChange={handleFieldChange("email")}
          required
        />
        <Input
          type="tel"
          label={t("appeal.form.phone")}
          value={form.phone}
          onChange={handleFieldChange("phone")}
          required
        />
        <div>
          <label className="mb-1 block text-[18px]">
            {t("appeal.form.answerType")}
          </label>
          <Select
            value={form.answerType}
            onValueChange={handleAnswerTypeChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">
                {t("appeal.form.answerOptions.phone")}
              </SelectItem>
              <SelectItem value="email">
                {t("appeal.form.answerOptions.email")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="mb-1 block text-[18px]">
          {t("appeal.form.message")}
        </label>
        <Textarea
          label={t("appeal.form.message")}
          rows={5}
          value={form.message}
          onChange={handleFieldChange("message")}
          required
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">{t("appeal.form.submit")}</Button>
      </div>
    </form>
  );
};
