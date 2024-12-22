type InputList = {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
};

export interface IEditSectionProps {
  inputList: InputList[];
}
