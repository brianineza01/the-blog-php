import { Route as R } from "@tanstack/react-router";
import { Route as PostsRoute } from ".";
import axios from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

const handleGetPostBySlug = async (slug: string) => {
    const res = await axios(`/blog-posts/${slug}`);
    return res.data;
};

const PostById = () => {
    const { slug } = Route.useParams();

    const { data, isLoading } = useQuery({
        queryKey: ["blog-posts", slug],
        queryFn: () => handleGetPostBySlug(slug),
    });

    const content = JSON.parse(data?.content || "{}");

    console.log(content);
    return (
        <div>
            <h1>Post by Id</h1>
            {isLoading ? <p>Loading...</p> : JSON.stringify(data)}
        </div>
    );
};
export const Route = new R({
    getParentRoute: () => PostsRoute,
    component: PostById,
    path: "$slug",
    beforeLoad: async ({ params }) => {
        console.log("before load", params);
    },
});

export default PostById;
