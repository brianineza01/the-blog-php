/* eslint-disable @next/next/no-img-element */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

import { getRenderedHTML } from "@/components/Novel/utils";
import axios from "@/config/axios";
import { permanentRedirect } from "next/navigation";
import { cookies } from "next/headers";
import dns from "dns";
import { AxiosResponse } from "axios";
import { Button } from "../../../components/ui/button";
import React from "react";
import ActionButtons from "../../../components/Posts/ActionButtons";

export interface BlogPostResponse {
    id: number;
    name: string;
    image_url: string;
    slug: string;
    created_at: string;
    updated_at: string;
    content: string;
    user_id: number;
    user: User;
}

export interface User {
    name: string;
    email: string;
}

const handleGetPostBySlug = async (slug: string) => {
    dns.setDefaultResultOrder("ipv4first");
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const requestCookie: string = allCookies.reduce(
        (acc, cookie) => `${acc}${cookie.name}=${cookie.value};`,
        ""
    );

    try {
        const res = await axios.get<any, AxiosResponse<BlogPostResponse>>(
            `/api/blog-posts/${slug}`,
            {
                headers: {
                    Cookie: requestCookie,
                },
                proxy: undefined,
            }
        );
        return res.data;
    } catch (error: any) {
        console.log(error.response.data);
        return null;
    }
};

export default async function BlogPage({
    params,
}: {
    params: { slug: string };
}) {
    const data = await handleGetPostBySlug(params.slug);

    if (data == null) {
        permanentRedirect("/404");
    }

    let blogContent = JSON.parse(data.content);

    blogContent =
        typeof blogContent === "string" ? JSON.parse(blogContent) : blogContent;

    const html_data = getRenderedHTML(blogContent);

    return (
        <main className="flex justify-center items-center min-h-screen">
            <div className="flex-col lg:flex-row gap-6 flex w-4/5 border-1 border-primary">
                <div className="lg:w-1/2 flex flex-col items-center justify-center">
                    <img
                        alt={params.slug}
                        className="aspect-content overflow-hidden rounded-lg object-cover sticky"
                        height={300}
                        src={data.image_url}
                        width={500}
                    />
                    <ActionButtons />
                </div>
                <div className="lg:w-1/2">
                    <article className="prose prose-gray max-w-none dark:prose-invert">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                            {data.name}
                        </h1>
                        <div className="flex flex-col gap-4 mt-8">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage
                                        alt="Author's avatar"
                                        src="/placeholder-avatar.jpg"
                                    />
                                    <AvatarFallback>JP</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold">
                                        {data.user.name}
                                    </div>
                                </div>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{ __html: html_data }}
                            />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mt-4">
                            Published on January 17, 2024
                        </p>
                    </article>
                </div>
            </div>
        </main>
    );
}
