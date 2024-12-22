import { customFetch } from "@/shared/api";

export const Login = (body: {
  username: string;
  password: string;
}): Promise<{ token: string }> => {
  return customFetch({ method: "POST", path: "token/", body: { json: body } });
};
