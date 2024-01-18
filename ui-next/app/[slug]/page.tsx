/* eslint-disable @next/next/no-img-element */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { API_BASE_URL } from "@/config/fetch";

import { getRenderedHTML } from "@/components/Novel/utils";

const handleGetPostBySlug = async (slug: string) => {
    const res = await fetch(`${API_BASE_URL}/api/blog-posts/${slug}`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data;
};

export default async function BlogPage({
    params,
}: {
    params: { slug: string };
}) {
    const data = await handleGetPostBySlug(params.slug);

    const blogContent = JSON.parse(data.content);

    const html_data = getRenderedHTML(blogContent);

    return (
        <main className="flex justify-center items-center min-h-screen">
            <div className="flex-col lg:flex-row gap-6 flex w-4/5 border-1 border-primary">
                <div className="lg:w-1/2">
                    <img
                        alt={params.slug}
                        className="aspect-content overflow-hidden rounded-lg object-cover sticky"
                        height={300}
                        src={data.image_url}
                        width={500}
                    />
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
                                        John Doe
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        AI Enthusiast
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
