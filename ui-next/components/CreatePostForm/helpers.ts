import axios from "@/config/axios";

type Post = {
    name: string;
    image: File;
    content: Record<string, unknown>;
};

export const handleCreatePostRequest = async (post: Post) => {
    await fetch(`/backend/sanctum/csrf-cookie`);

    const formData = new FormData();
    formData.append("name", post.name);
    formData.append("image", post.image);
    formData.append("content", JSON.stringify(post.content));

    const response = await fetch("/backend/api/blog-posts", {
        method: "POST",
        body: formData,
    });
    return response.json();
};
