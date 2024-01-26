import React from "react";
import Login from "@/components/Login";
import { cookies } from "next/headers";
import axios from "@/config/axios";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";

const getCurrentAuthUser = async () => {
    const allCookies = cookies().getAll();

    console.log(allCookies);

    try {
        const authUser = await axios.get("/user", {
            withCredentials: true,
            headers: {
                Cookie: allCookies
                    .map((cookie) => `${cookie.name}=${cookie.value}`)
                    .join(";"),
            },
        });
        return authUser.data;
    } catch (error: any) {
        const axErr: AxiosError = error;
        return null;
    }
};

const Page = async () => {
    const currentUser = await getCurrentAuthUser();

    if (currentUser !== null) {
        redirect("/");
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <Login />
        </div>
    );
};

export default Page;
