
export interface GeneralPageProps {
    params: { locale: string; slug: string[] };
}

export interface IContent {
    id: number;
    content: {
        [key: string]: Object;
    };
    options: {
        [key: string]: Object;
    };
    order: number
}

