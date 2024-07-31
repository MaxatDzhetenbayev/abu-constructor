import { editModalList, widgetsList } from "@/shared/lib/constants";

export const getWidgetByName = (name: string, props: any) => {
    const widget = widgetsList.find((w, idx) => {
        return w.name === name;
    });
    if (widget) {
        return widget({ ...props });
    }
    return null;
};

export const getEditModal = (
    modal: string,
    order: number,
    ruPageId: string | null,
    kzPageId: string | null,
    queryKey: string,
    template?: boolean,
) => {
    if (ruPageId && kzPageId) {
        const baseProps = {
            order,
            ruPageId: +ruPageId,
            kzPageId: +kzPageId,
            queryKey,
        };
        const editModal = editModalList.find((m) => m.name.includes(modal));
        if (editModal) {
            const variant = template ? "dialog" : "card";
            return editModal({ variant, ...baseProps });
        }
        return null;
    }
};