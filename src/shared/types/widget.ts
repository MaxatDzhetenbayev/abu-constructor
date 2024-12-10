import { IContent } from "./common";

export interface IWidget {
    id: number;
    widget_type: string;
    options: {
        [key: string]: any;
    };
    order: number;
    contents: IContent[];
}

export interface IWidgetProps {
    contents: Array<any>;
    options: any;
    locale: string;
}