"use client";

import React, { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
    // useEffect(() => {
    //     fetch(`${API_BASE_URL}`, {
    //         method: "POST",
    //         credentials: "include",
    //     });
    // }, []);
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default Providers;
