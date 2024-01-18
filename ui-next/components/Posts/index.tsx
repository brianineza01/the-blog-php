import { useQuery } from "@tanstack/react-query";
import { handleGetPosts } from "./helpers";
import PostCard from "./PostCard";

const Posts = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["blog-posts"],
        queryFn: handleGetPosts,
    });
    return (
        <div className="flex flex-wrap flex-shrink-0 gap-2">
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
    );
};

export default Posts;
