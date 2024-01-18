import axios from "@/config/axios";

type Post = {
    name: string;
    image: File;
    content: Record<string, unknown>;
};

export const handleCreatePostRequest = async (post: Post) => {
    // const response = await axios.post("/blog-posts", {

    // }, {});

    const formData = new FormData();
    formData.append("name", post.name);
    formData.append("image", post.image);
    formData.append("content", JSON.stringify(post.content));

    const response = await axios.post("/blog-posts", {
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
