export interface InputComponent {
  label?: string;
  value: string;
  select?: {
    placeholder: string;
    values: {
      value: string;
      label: string;
    }[];
  };
}

export interface EditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
  cardTitle: string;
  desc: string;
  triggerTitle: string;
  mainKeys: string[];
  mainInputs: InputComponent[];
  itemKeys: string[];
  itemInputs: InputComponent[];
  withTemplate: boolean;
  widgetName: string;
}