// src/providers/counter-store-provider.tsx
"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import { type ModalStore, createModalStore } from "@/stores";

export type ModalStoreApi = ReturnType<typeof createModalStore>;

export const ModalStoreContext = createContext<ModalStoreApi | undefined>(
    undefined
);

export interface ModalStoreProviderProps {
    children: ReactNode;
}

export const ModalStoreProvider = ({ children }: ModalStoreProviderProps) => {
    const storeRef = useRef<ModalStoreApi>();
    if (!storeRef.current) {
        storeRef.current = createModalStore();
    }

    return (
        <ModalStoreContext.Provider value={storeRef.current}>
            {children}
        </ModalStoreContext.Provider>
    );
};

export const useModalStore = <T,>(selector: (store: ModalStore) => T): T => {
    const counterStoreContext = useContext(ModalStoreContext);

    if (!counterStoreContext) {
        throw new Error(`useModalStore must be used within ModalStoreProvider`);
    }

    return useStore(counterStoreContext, selector);
};
