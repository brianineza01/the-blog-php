"use client";

import React from "react";
import axios from "config/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import Spinner from "../ui/Spinner";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";

const getCurrentUser = async () => {
    try {
        const result = await axios.get(`/backend/api/user`, {
            withCredentials: true,
        });
        return result.data ?? null;
    } catch (error) {
        const axiosErr = error as AxiosError;

        if (axiosErr.response?.status === 401) {
            return null;
        }
        throw error;
    }
};

const logoutHandler = async () => {
    await axios.post(`/backend/api/logout`, {
        withCredentials: true,
    });
};

const AuthLinks = () => {
    const { push } = useRouter();
    const { toast } = useToast();

    const {
        isLoading,
        data: currentUser,
        refetch,
    } = useQuery({
        queryFn: getCurrentUser,
        queryKey: ["user"],
        retry: false,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: logoutHandler,
        onSuccess: () => {
            toast({
                title: "Logout successful",
                description: "You have been logged out",
            });
            push("/");
            refetch();
        },
        onError: (err) => {
            toast({
                title: "Error",
                description: err.message ?? "Something went wrong",
                variant: "destructive",
            });
        },
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (currentUser) {
        return (
            <>
                <Link
                    className="text-sm font-medium hover:underline underline-offset-4"
                    href="/create-post"
                >
                    New Post
                </Link>
                <div className="text-sm font-medium">
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            alt="Author's avatar"
                            src="/placeholder-avatar.jpg"
                        />
                        <AvatarFallback>
                            {currentUser.name.split(" ")?.[0]?.[0] +
                                (currentUser.name.split(" ")?.[1]?.[0] ?? "")}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <Button
                    variant={"secondary"}
                    onClick={() => mutate()}
                    disabled={isPending || isLoading}
                >
                    {(isPending || isLoading) && <Spinner />}
                    Logout
                </Button>
            </>
        );
    }

    return (
        <>
            <Link
                className="text-sm font-medium hover:underline underline-offset-4 "
                href="/login"
            >
                Login
            </Link>
            <Link
                className="text-sm font-medium hover:underline underline-offset-4 "
                href="/register"
            >
                Register
            </Link>
        </>
    );
};

export default AuthLinks;
