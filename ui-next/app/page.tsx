import { useQuery } from "@tanstack/react-query";
import { handleGetPosts } from "../components/Posts/helpers";
import PostCard from "../components/Posts/PostCard";

export default async function Home() {
    const data = await handleGetPosts();
    return (
        <main className="flex-1">
            <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-gray-200">
                <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                    <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                        <div>
                            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gray-700 dark:text-gray-300">
                                Welcome to Our Blog
                            </h1>
                        </div>
                        <div className="flex flex-col items-start space-y-4">
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Discover the latest news, articles, and stories
                                from our team.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
                <div className="container space-y-12 px-4 md:px-6">
                    <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                        {data?.map((post) => (
                            <PostCard
                                key={post.slug}
                                img={post.image_url}
                                createdAt={post.created_at}
                                title={post.name}
                                slug={post.slug}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
