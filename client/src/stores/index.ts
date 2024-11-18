import { BoundSlice } from "./types";

import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createModalSlice } from "./slices/modal-slice";
import { createUserSlice, partializeUser } from "./slices/user-slice";

export const createBoundSlice = () => {
    return createStore<BoundSlice>()(
        devtools(
            immer(
                persist(
                    (...a) => ({
                        // @ts-expect-error - This is a bug in zustand
                        modal: createModalSlice(...a),
                        // @ts-expect-error - This is a bug in zustand
                        user: createUserSlice(...a),
                    }),
                    {
                        name: "user",
                        partialize: (state: BoundSlice) => ({
                            ...partializeUser(state),
                        }),
                    }
                )
            )
        )
    );
};
