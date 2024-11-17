import { StateCreator } from "zustand";
import { BoundSlice, MiddlewareType, UserSlice } from "../types";

export const partializeUser = (state: BoundSlice) => ({
    user: state.user.data,
});

export const createUserSlice: StateCreator<
    BoundSlice,
    MiddlewareType,
    [],
    UserSlice
> = (set) => ({
    data: null,
    setUser: (user) =>
        set((state) => {
            state.user.data = user;
        }),
});
