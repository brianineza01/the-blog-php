import { FileRoute } from "@tanstack/react-router";
import CreatePostForm from "@/components/CreatePostForm/Index";

const CreatePosts = () => {
    return <CreatePostForm />;
};
export const Route = new FileRoute('/posts/create').createRoute({
    component: CreatePosts,
});

export default CreatePosts;
