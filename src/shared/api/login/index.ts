import { backendUrl } from "@/shared/lib/constants";

export const fetchLogin = async (body: {
  username: string;
  password: string;
}) => {
  const response = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  return response.json();
};


export const fetchLogout = async () => {
  const response = await fetch(`${backendUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return response.json();
}
