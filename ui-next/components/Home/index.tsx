import { useQuery } from "@tanstack/react-query";
import { handleGetPosts } from "../Posts/helpers";
import PostCard from "../Posts/PostCard";

export default function Home() {
    const { data, isLoading } = useQuery({
        queryKey: ["blog-posts"],
        queryFn: handleGetPosts,
    });

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="px-4 lg:px-6 h-14 flex items-center bg-gray-200 dark:bg-gray-800">
                <a className="flex items-center justify-center" href="#">
                    <TagsIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    <span className="sr-only">Blog Logo</span>
                </a>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <a
                        className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
                        href="#"
                    >
                        Home
                    </a>
                    <a
                        className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
                        href="#"
                    >
                        About
                    </a>
                    <a
                        className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
                        href="#"
                    >
                        Contact
                    </a>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-gray-200 dark:bg-gray-800">
                    <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                        <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                            <div>
                                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gray-700 dark:text-gray-300">
                                    Welcome to Our Blog
                                </h1>
                            </div>
                            <div className="flex flex-col items-start space-y-4">
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Discover the latest news, articles, and
                                    stories from our team.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
                    <div className="container space-y-12 px-4 md:px-6">
                        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                data?.map((post) => (
                                    <PostCard
                                        key={post.slug}
                                        img={post.image_url}
                                        createdAt={post.created_at}
                                        title={post.name}
                                        slug={post.slug}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </section>
                {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-gray-800">
                    <div className="container grid items-center justify-center gap-4 px-4 md:px-6 lg:gap-10">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        className="text-gray-700 dark:text-gray-300"
                                        href="#"
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        className="text-gray-700 dark:text-gray-300"
                                        href="#"
                                    >
                                        1
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        className="text-gray-700 dark:text-gray-300"
                                        href="#"
                                        isActive
                                    >
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        className="text-gray-700 dark:text-gray-300"
                                        href="#"
                                    >
                                        3
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis className="text-gray-700 dark:text-gray-300" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        className="text-gray-700 dark:text-gray-300"
                                        href="#"
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </section> */}
            </main>
        </div>
    );
}

function TagsIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z" />
            <path d="M6 9.01V9" />
            <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
        </svg>
    );
}
