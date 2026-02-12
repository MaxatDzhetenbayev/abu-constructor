export type AppealType = "appeal" | "claim" | "corruption" | "rector";

export type AnswerType = "phone" | "email" | "no_answer";

export interface IAppeal {
  id: number;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  answer_type: AnswerType | null;
  appeal_type: AppealType;
  text: string;
  is_checked: boolean;
  checked_at: string | null;
  createdAt: string;
  updatedAt: string;
}

