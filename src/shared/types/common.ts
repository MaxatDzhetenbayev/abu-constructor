
export interface GeneralPageProps {
    params: { locale: string; slug: string[] };
}

export interface IContent {
    id: number;
    content: {
        [key: string]: object;
    };
    options: {
        [key: string]: object;
    };
    order: number
}

