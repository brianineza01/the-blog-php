import axios from "@/config/axios";

export interface Post {
    name: string;
    image_url: string;
    slug: string;
    created_at: string;
}

export const handleGetPosts = async () => {
    const response = await axios.get("/blog-posts");
    return response.data as Post[];
};
