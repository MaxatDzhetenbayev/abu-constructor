"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import {
  AppealType,
  IAppeal,
  useAppealById,
  useAppeals,
  useCompleteAppealCheck,
} from "@/entities/appeals";
import { Button, Input, Label, Modal } from "@/shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

type StatusFilter = "all" | "true" | "false";

const formatDate = (iso: string | null | undefined) => {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
};

const formatDateInputToISO = (value?: string) => {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
};

export default function AppealsPage() {
  const t = useTranslations("appeals");

  const [from, setFrom] = useState<string | undefined>();
  const [to, setTo] = useState<string | undefined>();
  const [appealType, setAppealType] = useState<AppealType | "all">("all");
  const [fullName, setFullName] = useState<string>("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const queryParams = useMemo(
    () => ({
      from: formatDateInputToISO(from),
      to: formatDateInputToISO(to),
      appeal_type: appealType === "all" ? undefined : appealType,
      full_name: fullName || undefined,
      is_checked: status === "all" ? undefined : status,
    }),
    [from, to, appealType, fullName, status]
  );

  const { data, isLoading, isError } = useAppeals(queryParams);

  const handleReset = () => {
    setFrom(undefined);
    setTo(undefined);
    setAppealType("all");
    setFullName("");
    setStatus("all");
  };

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>

      <section className="border rounded-md p-4 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-lg font-medium">{t("title")}</h2>
          <Button variant="outline" size="sm" onClick={handleReset}>
            {t("filters.reset")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <Input
            type="date"
            label={t("filters.periodFrom")}
            value={from ?? ""}
            onChange={(e) => setFrom(e.target.value || undefined)}
          />
          <Input
            type="date"
            label={t("filters.periodTo")}
            value={to ?? ""}
            onChange={(e) => setTo(e.target.value || undefined)}
          />

          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[18px]">
              {t("filters.appealType")}
            </Label>
            <Select
              value={appealType}
              onValueChange={(value) =>
                setAppealType(value as AppealType | "all")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("filters.appealType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("filters.statusAll")}
                </SelectItem>
                <SelectItem value="appeal">
                  {t("modal.appealTypesShort.appeal")}
                </SelectItem>
                <SelectItem value="claim">
                  {t("modal.appealTypesShort.claim")}
                </SelectItem>
                <SelectItem value="corruption">
                  {t("modal.appealTypesShort.corruption")}
                </SelectItem>
                <SelectItem value="rector">
                  {t("modal.appealTypesShort.rector")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            label={t("filters.fullName")}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[18px]">
              {t("filters.status")}
            </Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as StatusFilter)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("filters.statusAll")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filters.statusAll")}</SelectItem>
                <SelectItem value="true">
                  {t("filters.statusChecked")}
                </SelectItem>
                <SelectItem value="false">
                  {t("filters.statusUnchecked")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="border rounded-md p-4">
        {isLoading && <p>Загрузка...</p>}
        {isError && <p>Ошибка загрузки</p>}

        {!isLoading && !isError && (!data || data.length === 0) && (
          <p>{t("table.notFound")}</p>
        )}

        {!isLoading && !isError && data && data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border px-3 py-2 text-left">
                    {t("table.fullName")}
                  </th>
                  <th className="border px-3 py-2 text-left">
                    {t("table.createdAt")}
                  </th>
                  <th className="border px-3 py-2 text-left">
                    {t("table.appealType")}
                  </th>
                  <th className="border px-3 py-2 text-left">
                    {t("table.isChecked")}
                  </th>
                  <th className="border px-3 py-2 text-left">
                    {t("table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((appeal) => (
                  <AppealRow key={appeal.id} appeal={appeal} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}

const AppealRow = ({ appeal }: { appeal: IAppeal }) => {
  const t = useTranslations("appeals");

  const statusLabel = appeal.is_checked
    ? t("table.statusChecked")
    : t("table.statusUnchecked");

  const statusClass = appeal.is_checked ? "text-green-600" : "text-red-600";

  return (
    <tr className="hover:bg-muted/50 transition-colors">
      <td className="border px-3 py-2">
        {appeal.full_name || "-"}
      </td>
      <td className="border px-3 py-2">
        {formatDate(appeal.createdAt)}
      </td>
      <td className="border px-3 py-2">
        {t(`modal.appealTypesShort.${appeal.appeal_type}`)}
      </td>
      <td className={`border px-3 py-2 ${statusClass}`}>{statusLabel}</td>
      <td className="border px-3 py-2">
        <Modal
          isWfull
          headerSlot={<h2 className="text-xl font-semibold">{t("modal.title")}</h2>}
          modalSlot={<AppealModalContent id={appeal.id} />}
        >
          <Button size="sm">{t("table.view")}</Button>
        </Modal>
      </td>
    </tr>
  );
};

const AppealModalContent = ({ id }: { id: number }) => {
  const t = useTranslations("appeals");
  const { data: appeal, isLoading: isLoadingAppeal, isError: isErrorAppeal } =
    useAppealById(id);
  const completeMutation = useCompleteAppealCheck(id);

  if (isLoadingAppeal) return <p>Загрузка...</p>;
  if (isErrorAppeal || !appeal) return <p>Ошибка загрузки</p>;

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label={t("modal.fields.fullName")} value={appeal.full_name} />
        <Field label={t("modal.fields.email")} value={appeal.email} />
        <Field label={t("modal.fields.phone")} value={appeal.phone} />
        <Field
          label={t("modal.fields.appealType")}
          value={t(`modal.appealTypes.${appeal.appeal_type}`)}
        />
        <Field
          label={t("modal.fields.answerType")}
          value={
            appeal.answer_type
              ? t(`modal.answerTypes.${appeal.answer_type}`)
              : "-"
          }
        />
        <Field
          label={t("modal.fields.createdAt")}
          value={formatDate(appeal.createdAt)}
        />
        <Field
          label={t("modal.fields.isChecked")}
          value={
            appeal.is_checked
              ? t("table.statusChecked")
              : t("table.statusUnchecked")
          }
        />
        <Field
          label={t("modal.fields.checkedAt")}
          value={formatDate(appeal.checked_at)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">
          {t("modal.fields.text")}
        </span>
        <div className="border rounded-md p-3 whitespace-pre-wrap">
          {appeal.text}
        </div>
      </div>

      {!appeal.is_checked && (
        <div className="flex justify-end">
          <Button
            onClick={() => completeMutation.mutate()}
            disabled={completeMutation.isPending}
          >
            {completeMutation.isPending
              ? t("modal.actions.completing")
              : t("modal.actions.complete")}
          </Button>
        </div>
      )}
    </section>
  );
};

const Field = ({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-semibold">{label}</span>
    <span className="text-sm text-muted-foreground">
      {value ?? "-"}
    </span>
  </div>
);

