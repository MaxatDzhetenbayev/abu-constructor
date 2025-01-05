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
  })
  return response.json();
};
