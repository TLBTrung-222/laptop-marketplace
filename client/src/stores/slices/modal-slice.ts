import { StateCreator } from "zustand";
import { BoundSlice, MiddlewareType, ModalSlice } from "../types";

export const createModalSlice: StateCreator<
    BoundSlice,
    MiddlewareType,
    [],
    ModalSlice
> = (set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) =>
        set((state) => {
            state.modal.type = type;
            state.modal.isOpen = true;
        }),
    onClose: () =>
        set((state) => {
            state.modal.type = null;
            state.modal.isOpen = false;
        }),
});
