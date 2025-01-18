export type ApiResponse<T> = {
    data: T;
    isSuccess: boolean;
    errors: string | string[] | null;
};

export type Category = {
    id: number;
    type: string;
};

export type Brand = {
    id: number;
    name: string;
};
