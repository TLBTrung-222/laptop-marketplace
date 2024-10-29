import { createStore } from "zustand/vanilla";

export type ModalType = "auth";

export type ModalState = {
    type: ModalType | null;
    isOpen: boolean;
};

export type ModalActions = {
    onOpen: (type: ModalType) => void;
    onClose: () => void;
};

export type ModalStore = ModalState & ModalActions;

export const defaultInitState: ModalState = {
    type: null,
    isOpen: false,
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
    return createStore<ModalStore>()((set) => ({
        ...initState,
        onOpen: (type: ModalType) => set(() => ({ isOpen: true, type })),
        onClose: () => set(() => ({ isOpen: false, type: null })),
    }));
};
