 "use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { backendUrl } from "@/shared/lib/constants";
import {
  Button,
  Input,
  Modal,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Textarea,
} from "@/shared/ui";
import { toast } from "@/shared/ui/use-toast";

type AppealType = "appeal" | "claim" | "corruption";
// значения ровно как в AnswerType enum на бэке
type AnswerType = "phone" | "email" | "no_answer";

interface AppealFormState {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  answerType: AnswerType;
}

export const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="w-full bg-abu_primary">
      <div className="max-w-[1200px] mx-auto p-10">
        <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)] items-start mb-10">
          <div className="flex flex-col gap-4 text-white">
            <h2 className="text-2xl">{t("home.contacts.our")}</h2>
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <Phone />
                <a href="tel:+7 7222 42-32-24">+7 (7222) 42-32-24</a>
              </div>
              <div className="flex gap-4">
                <Mail />
                <a href="mailto:semey@abu.edu.kz">semey@abu.edu.kz</a>
              </div>
              <div className="flex gap-4">
                <MapPin />
                <span>{t("home.contacts.geo")}</span>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="mt-4 flex flex-col gap-4 items-start md:flex-row md:items-center md:justify-between">
          <span className="text-white">
            ©{new Date().getFullYear()} {t("all_rights")}.
          </span>
          <AppealButton />
        </div>
      </div>
    </footer>
  );
};

const AppealButton = () => {
  const t = useTranslations();

  return (
    <Modal
      
      headerSlot={t("appeal.modal.title")}
      modalSlot={<AppealModalContent />}
    >
      <Button
        variant="ghost"
        size="lg"
        className="border border-white text-white px-10 rounded-full hover:bg-white/10"
      >
        {t("appeal.button")}
      </Button>
    </Modal>
  );
};

const AppealModalContent = () => {
  const t = useTranslations();
  const [step, setStep] = useState<1 | 2>(1);
  const [type, setType] = useState<AppealType | null>(null);
  const [form, setForm] = useState<AppealFormState>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    answerType: "phone",
  });

  const isAnonymous = type === "corruption";

  const handleFieldChange =
    (field: keyof AppealFormState) =>
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

  const handleSelectType = (value: AppealType) => {
    setType(value);
    setStep(2);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!type) return;

    const payload: Record<string, unknown> = {
      // поля и значения как в CreateAppealDto
      appeal_type: type, // "appeal" | "claim" | "corruption"
      text: form.message,
    };

    if (!isAnonymous) {
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
        // "phone" | "email" | "no_answer"
        payload.answer_type = form.answerType;
      }
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
          title: t("appeal.modal.successTitle"),
          description: t("appeal.modal.successDescription"),
        });

        setStep(1);
        setType(null);
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
          title: t("appeal.modal.errorTitle"),
          description: t("appeal.modal.errorDescription"),
        });
      });
  };

  return (
    <div className="space-y-6">
      <AppealStepper step={step} />

      {step === 1 ? (
        <div className="flex flex-col gap-4 ">
          <AppealTypeCard
            title={t("appeal.modal.types.appeal.title")}
            description={t("appeal.modal.types.appeal.description")}
            onClick={() => handleSelectType("appeal")}
          />
          <AppealTypeCard
            title={t("appeal.modal.types.claim.title")}
            description={t("appeal.modal.types.claim.description")}
            onClick={() => handleSelectType("claim")}
          />
          <AppealTypeCard
            title={t("appeal.modal.types.corruption.title")}
            description={t("appeal.modal.types.corruption.description")}
            onClick={() => handleSelectType("corruption")}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isAnonymous && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label={t("appeal.modal.fields.fullName")}
                value={form.fullName}
                onChange={handleFieldChange("fullName")}
              />
              <Input
                type="email"
                label={t("appeal.modal.fields.email")}
                value={form.email}
                onChange={handleFieldChange("email")}
              />
              <Input
                type="tel"
                label={t("appeal.modal.fields.phone")}
                value={form.phone}
                onChange={handleFieldChange("phone")}
              />
              <div>
                <label className="mb-1 block text-[18px]">
                  {t("appeal.modal.fields.answerType")}
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
                      {t("appeal.modal.fields.answerOptions.phone")}
                    </SelectItem>
                    <SelectItem value="email">
                      {t("appeal.modal.fields.answerOptions.email")}
                    </SelectItem>
                    <SelectItem value="no_answer">
                      {t("appeal.modal.fields.answerOptions.noAnswer")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="mb-1 block text-[18px]">
              {t("appeal.modal.fields.message")}
            </label>
            <Textarea
              label={t("appeal.modal.fields.message")}
              rows={5}
              value={form.message}
              onChange={handleFieldChange("message")}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
            >
              {t("appeal.modal.back")}
            </Button>
            <Button type="submit">{t("appeal.modal.submit")}</Button>
          </div>
        </form>
      )}
    </div>
  );
};

const AppealStepper = ({ step }: { step: 1 | 2 }) => {
  const t = useTranslations();

  const steps = [
    { id: 1 as const, label: t("appeal.modal.step1Title") },
    { id: 2 as const, label: t("appeal.modal.step2Title") },
  ];

  return (
    <div className="flex items-center gap-4">
      {steps.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium ${
                step >= item.id
                  ? "bg-abu_primary text-white border-abu_primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {item.id}
            </div>
            <span
              className={`text-sm ${
                step >= item.id ? "font-medium" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="h-px flex-1 bg-border" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

interface AppealTypeCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const AppealTypeCard = ({
  title,
  description,
  onClick,
}: AppealTypeCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full flex-col justify-between rounded-lg border bg-white p-4 text-left shadow-sm transition hover:shadow-md"
    >
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-abu_primary">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
};
