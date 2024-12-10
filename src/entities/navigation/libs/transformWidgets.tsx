import { IWidget } from "@/shared/types";


interface ITransfromWidetsPorps {
    widgets: IWidget[],
    locale: string,
    getWidgetByName: (name: string, props: any) => React.JSX.Element | null
}


export function transfromWidgets({ widgets, locale, getWidgetByName }: ITransfromWidetsPorps): React.JSX.Element[] {
    return widgets?.map(({ widget_type, options, contents }, idx) => {
        const widgetOptons = { contents, options, locale };
        const widgetContent = getWidgetByName(widget_type, widgetOptons);
        return (
            <div id={`widget-${idx}`
            } key={idx} style={{ scrollMarginTop: "200px" }}>
                {widgetContent}
            </div>
        );
    });
}