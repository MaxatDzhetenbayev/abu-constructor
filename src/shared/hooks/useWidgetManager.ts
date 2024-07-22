// useWidgetManager.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { saveToServerAndGetUrl } from "@/shared/lib/utils";
import { useToast } from "@/shared/ui";
import { WidgetProps, BackedPage } from "@/shared/lib/types";

// Моковые функции для API запросов
export const createWidget = async (data: any) => {
    // Моковая функция создания виджета
    return { id: Math.random(), ...data };
};

export const editWidget = async ({ id, navigation_id, body }: { id: number; navigation_id: number; body: any }) => {
    // Моковая функция редактирования виджета
    return { id, navigation_id, ...body };
};

export const deletePage = async (id: number) => {
    // Моковая функция удаления страницы
    return { success: true };
};

export const getWidgetProps = async ({ ruPageId, kzPageId, order }: { ruPageId: number | null; kzPageId: number | null; order: number }) => {
    // Моковая функция получения свойств виджета
    return {
        ruOptions: { title: "Title RU", variant: "base", items: [] },
        kzOptions: { title: "Title KZ", variant: "base", items: [] },
        ruWidgetId: ruPageId,
        kzWidgetId: kzPageId,
    };
};

export const createPage = async (data: any) => {
    // Моковая функция создания страницы
    return { id: Math.random(), ...data };
};

interface UseWidgetManagerProps {
    ruPageId: number | null;
    kzPageId: number | null;
    order: number;
    queryKey: string[];
    widgetType: string;
    initialProps?: Partial<WidgetProps>;
}

interface WidgetItem {
    titleRu: string;
    titleKz: string;
    contentRu: string;
    contentKz: string;
    href?: string;
    image: File | null;
    templateSlug: string;
    page?: {
        ru: BackedPage;
        kz: BackedPage;
    };
}

type WidgetsState = Record<string, WidgetItem>;

export const useWidgetManager = ({
    ruPageId,
    kzPageId,
    order,
    queryKey,
    widgetType,
    initialProps = {},
}: UseWidgetManagerProps) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [props, setProps] = useState<WidgetProps | null>(null);
    const [widgets, setWidgets] = useState<WidgetsState>({});
    const [title, setTitle] = useState<{ ru: string; kz: string }>(
        initialProps.title || { ru: "", kz: "" }
    );
    const [variant, setVariant] = useState(initialProps.variant || "base");
    const [savedTemplate, setSavedTemplate] = useState<string | null>(null);
    const [hasTemplate, setHasTemplate] = useState(false);

    const fetchWidgetProps = async () => {
        if (ruPageId && kzPageId) {
            const data = await getWidgetProps({ ruPageId, kzPageId, order });
            setProps(data);
        }
    };

    useEffect(() => {
        fetchWidgetProps();
    }, [ruPageId, kzPageId, order]);

    useEffect(() => {
        if (props) {
            setTitle(props.ruOptions.title || { ru: "", kz: "" });
            setVariant(props.ruOptions.variant || "base");
            const temp: WidgetsState = {};
            let items = props.ruOptions.items;
            if (Array.isArray(items)) {
                if (items[0]) {
                    const templateName = items[0].templateName;
                    if (templateName) {
                        setSavedTemplate(templateName);
                        setHasTemplate(true);
                    }
                }
                items.forEach((item, idx) => {
                    temp[item.templateId] = {
                        templateSlug: item.templateSlug,
                        titleRu: item.title,
                        titleKz: props.kzOptions.items[idx].title,
                        href: item.href,
                        contentRu: item.content,
                        contentKz: props.kzOptions.items[idx].content,
                        image: item.image,
                    };
                });
            }
            setWidgets(temp);
        }
    }, [props]);

    const queryClient = useQueryClient();

    const createWidgetMutation = useMutation({
        mutationFn: createWidget,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            setLoading(false);
            toast({ title: "Виджет создан." });
        },
    });

    const editWidgetMutation = useMutation({
        mutationFn: editWidget,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            setLoading(false);
            toast({ title: "Виджет изменен." });
        },
    });

    const addWidget = async () => {
        const ruPage = await createPage({
            title: "templatePage",
            slug: `template-${Date.now()}`,
            navigation_id: null,
            navigation_type: "template",
            order: 1,
            language_key: "ru",
        });
        const kzPage = await createPage({
            title: "templatePage",
            slug: ruPage.slug,
            navigation_id: null,
            navigation_type: "template",
            order: 1,
            language_key: "kz",
        });
        setWidgets({
            ...widgets,
            [`${ruPage.id}*${kzPage.id}`]: {
                titleRu: "",
                titleKz: "",
                contentRu: "",
                contentKz: "",
                image: null,
                templateSlug: ruPage.slug,
                page: { ru: ruPage, kz: kzPage },
            },
        });
    };

    const writeChanges = (id: string, field: keyof WidgetItem, value: string | File | null) => {
        if (!(id in widgets)) return;
        setWidgets({ ...widgets, [id]: { ...widgets[id], [field]: value } });
    };

    const onSave = async () => {
        if (ruPageId && kzPageId) {
            const ruItems = await Promise.all(
                Object.keys(widgets).map(async (key) => {
                    const image = await saveToServerAndGetUrl(widgets[key].image);
                    return {
                        title: widgets[key].titleRu,
                        content: widgets[key].contentRu,
                        image,
                        href: hasTemplate ? widgets[key].page?.ru.slug : "",
                        templateId: key,
                        templateSlug: widgets[key].page?.ru.slug,
                        templateName: savedTemplate ? savedTemplate : null,
                    };
                })
            );
            const kzItems = await Promise.all(
                Object.keys(widgets).map(async (key) => {
                    const image = await saveToServerAndGetUrl(widgets[key].image);
                    return {
                        title: widgets[key].titleKz,
                        content: widgets[key].contentKz,
                        image,
                        href: hasTemplate ? widgets[key].page?.kz.slug : "",
                        templateId: key,
                        templateSlug: widgets[key].page?.ru.slug,
                        templateName: savedTemplate ? savedTemplate : null,
                    };
                })
            );
            createWidgetMutation.mutate({
                widget_type: widgetType,
                order,
                options: JSON.stringify({
                    title: title.ru,
                    variant,
                    items: ruItems,
                    language_key: "ru",
                    navigation_id: +ruPageId,
                }),
                language_key: "ru",
                navigation_id: +ruPageId,
            });
            createWidgetMutation.mutate({
                widget_type: widgetType,
                order,
                options: JSON.stringify({
                    title: title.kz,
                    variant,
                    items: kzItems,
                }),
                language_key: "kz",
                navigation_id: +kzPageId,
            });
        }
    };

    const onEdit = async () => {
        if (props) {
            const ruItems = await Promise.all(
                Object.keys(widgets).map(async (key) => {
                    const image = await saveToServerAndGetUrl(widgets[key].image);
                    return {
                        title: widgets[key].titleRu,
                        content: widgets[key].contentRu,
                        image,
                        href: widgets[key].href
                            ? widgets[key].href
                            : widgets[key].page
                                ? widgets[key].page.ru.slug
                                : widgets[key].templateSlug,
                        templateId: key,
                        templateName: savedTemplate ? savedTemplate : null,
                    };
                })
            );

            const kzItems = await Promise.all(
                Object.keys(widgets).map(async (key) => {
                    const image = await saveToServerAndGetUrl(widgets[key].image);
                    return {
                        title: widgets[key].titleKz,
                        content: widgets[key].contentKz,
                        href: widgets[key].href
                            ? widgets[key].href
                            : widgets[key].page
                                ? widgets[key].page.ru.slug
                                : widgets[key].templateSlug,
                        image,
                        templateId: key,
                        templateName: savedTemplate ? savedTemplate : null,
                    };
                })
            );

            if (ruPageId && kzPageId) {
                editWidgetMutation.mutate({
                    id: props.ruWidgetId,
                    navigation_id: ruPageId,
                    body: {
                        options: JSON.stringify({
                            title: title.ru,
                            variant,
                            items: ruItems,
                        }),
                    },
                });
                editWidgetMutation.mutate({
                    id: props.kzWidgetId,
                    navigation_id: kzPageId,
                    body: {
                        options: JSON.stringify({
                            title: title.kz,
                            variant,
                            items: kzItems,
                        }),
                    },
                });
            }
        }
    };

    const deleteWidget = (id: string) => {
        setWidgets((prev) => {
            const temp = { ...prev };
            delete temp[id];
            return temp;
        });
        const ids = id.split("*");
        ids.forEach((id) => {
            deletePage(+id);
        });
    };

    return {
        loading,
        title,
        setTitle,
        variant,
        setVariant,
        widgets,
        addWidget,
        writeChanges,
        onSave,
        onEdit,
        deleteWidget,
        setSelectedTemplate,
        hasTemplate,
        setHasTemplate,
        savedTemplate,
    };
};
