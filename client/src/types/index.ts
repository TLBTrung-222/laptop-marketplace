export type Role = "admin" | "seller" | "buyer";

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
    googleId: string | null;
    role: {
        roleName: Role;
    };
};

export type Rating = {
    id: number;
    ratingStar: number;
    comment: string;
    product: Product;
    buyer: Account;
};

export type Image = {
    id: number;
    image: string;
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
    images: Image[];
};

export type ProductDetail = {
    id: number;
    cpu: string;
    ram: string;
    storage: string;
    gpu: string;
    display: string;
    port: string;
    keyboard: string;
    lan: string;
    wifi: string;
    bluetooth: string;
    webcam: string;
    os: string;
    battery: string;
    weight: number;
    color: string;
    dimensions: string;
    product: Product;
};

export type Approval = {
    id: number;
    approvalStatus: "pending" | "approved" | "rejected";
    submissionDate: string;
    seller: Account;
    product: Product;
};

export type Payment = {
    id: number;
    paymentAmount: number;
    paymentStatus: 1 | 2;
    paymentMethod: "cod" | "vnpay";
    paymentDate: string;
};

export type Shipping = {
    id: number;
    shippingStatus: "waiting to be packed" | "delivering" | "completed";
    city: string;
    district: string;
    street: string;
    shippingDate: string;
    deliveryDate: string | null;
};

export type Order = {
    id: number;
    totalAmount: number;
    orderStatus: "pending" | "completed";
    orderDate: string;
    completionDate: string | null;
    payment: Payment;
    shipping: Shipping;
    buyer: Account;
};

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    images: Image[];
}