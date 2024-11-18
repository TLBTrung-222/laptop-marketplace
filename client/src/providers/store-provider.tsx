"use client";

import { createBoundSlice } from "@/stores";
import { BoundSlice } from "@/stores/types";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

type StoreApi = ReturnType<typeof createBoundSlice>;
const StoreContext = createContext<StoreApi | undefined>(undefined);

interface StoreProviderProps {
    children: React.ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const storeRef = useRef<StoreApi>();
    if (!storeRef.current) {
        storeRef.current = createBoundSlice();
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    );
};

export const useAppStore = <T,>(selector: (store: BoundSlice) => T): T => {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error("useAppStore must be used within a StoreProvider");
    }
    return useStore(store, selector);
};
