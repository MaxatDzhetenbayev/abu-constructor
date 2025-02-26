import { setCookie } from "cookies-next";

import { backendUrl } from "@/shared/lib/constants";

export const fetchLogin = async (body: {
  username: string;
  password: string;
}) => {
  await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },

  }).then((res) => {
    if (!res.ok) {
      throw new Error("Ошибка");
    }
    return res.json();
  }).then((res) => {

    setCookie("accessToken", res.token)
  })
};


export const fetchLogout = async () => {
  const response = await fetch(`${backendUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return response.json();
}
