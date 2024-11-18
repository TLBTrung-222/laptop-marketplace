export type User = {
    id: number;
    email: string;
    phoneNumber: string;
    name: string;
    avatar: {
        type: string;
        data: number[];
    };
};
