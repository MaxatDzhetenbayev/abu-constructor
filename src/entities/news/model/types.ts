export interface INews {
    id: number,
    title: {
        [key: string]: string
    },
    content: {
        [key: string]: {
            description: string,
            images: string[],
        }
    },
    viewCount: number,
    createdAt: Date,
    updatedAt: Date,
}