import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";

export interface ContentManageModalProps {
    action: "create" | "update";
    id?: number | undefined;
    widget_type: string;
    contents?: any | undefined;
    widgetOptionsList: EditOptionsProps[];
    widget_variant?: string;
    TemplateSection?: any;
    handleCreateContent: any;
    handleUpdateContent: any;
}

export interface ContentManageModelProps {
    action: "create" | "update";
    widget_type: string;
    widgetOptionsList: EditOptionsProps[];
    contents?: any;
    reset: () => void;
    closeRef: React.RefObject<HTMLButtonElement>;
    handleCreateContent: any;
    handleUpdateContent: any;
}
