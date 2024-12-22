import { useState } from "react";

import { ContentManageModelProps } from "./types";

export const useManageContent = ({
    action,
    widget_type,
    widgetOptionsList,
    reset,
    closeRef,
    handleCreateContent,
    handleUpdateContent
}: ContentManageModelProps) => {
    const [isUploading, setIsUploading] = useState(false);

    const options = widgetOptionsList.find(
        (item) => item.widgetName === widget_type
    )?.contentOptions;

    const onSubmit = async (data: any) => {
        const handleFunc =
            action === "create" ? handleCreateContent : handleUpdateContent;
        await handleFunc(data);
        closeRef.current?.click();
        reset();
    };

    return { onSubmit, isUploading, setIsUploading, options };
};
