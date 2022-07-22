
export interface Sub{
    nick: string;
    avatar: string;
    subMonths: number;
    description?: string;
}

export type SubsResponseFromApi = Array<{
    nick: string;
    profileUrl: string;
    month: number;
    description?: string;
}>