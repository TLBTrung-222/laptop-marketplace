"use client";

import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { AxiosError } from "axios";

interface ApiResponse<T = any> {
    isSuccess: boolean;
    data: T;
    errors: string | string[];
}

declare module "@tanstack/react-query" {
    interface Register {
        defaultError: AxiosError<ApiResponse>;
    }
}

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export function QueryProvider(props: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
                {props.children}
                <ReactQueryDevtools initialIsOpen={false} />
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    );
}
