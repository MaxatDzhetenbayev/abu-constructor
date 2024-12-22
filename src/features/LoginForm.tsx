"use client";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

import { Login } from "@/shared/api/login";
import { Button, Input } from "@/shared/ui";

import { useMutation } from "@tanstack/react-query";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const t = useTranslations("login");
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onSuccess: (data) => {
      setCookie("token", data.token);
      router.refresh();
    },
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ username, password });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label={t("login")}
        type="text"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label={t("password")}
        type="password"
      />
      <Button disabled={isPending} loading={isPending} className="w-full">
        {t("btn")}
      </Button>
    </form>
  );
};
