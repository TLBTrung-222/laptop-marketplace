// This import to help zustand to infer the types of middleware
import {} from "zustand/middleware";
import {} from "zustand/middleware/immer";

import { User } from "@/types";

// Modal
export type ModalType = "auth";

type ModalState = {
    type: ModalType | null;
    isOpen: boolean;
};

export type ModalActions = {
    onOpen: (type: ModalType) => void;
    onClose: () => void;
};

export type ModalSlice = ModalState & ModalActions;

// User
export type UserState = {
    data: User | null;
};

export type UserActions = {
    setUser: (user: UserState["data"]) => void;
};

export type UserSlice = UserState & UserActions;

// Bound Store
export type BoundSlice = {
    modal: ModalSlice;
    user: UserSlice;
};

export type MiddlewareType = [
    ["zustand/devtools", never],
    ["zustand/immer", never],
    ["zustand/persist", UserState["data"]]
];
