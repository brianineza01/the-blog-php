import { FileRoute } from "@tanstack/react-router";

const Posts = () => {
    return <div>Posts</div>;
};

export const Route = new FileRoute('/posts/').createRoute({
    component: Posts,
});

export default Posts;
