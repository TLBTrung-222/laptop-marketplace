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

export type Account = {
    id: number;
    email: string;
    phoneNumber: string;
    name: string;
    avatar: string | null;
};

export type Rating = {
    id: number;
    ratingStar: number;
    comment: string;
    product: Product;
    buyer: Account;
};

export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    stockQuantity: number;
    status: "new" | "old";
    seller: Account;
    brand: Brand;
    category: Category;
    ratings: Rating[];
};
