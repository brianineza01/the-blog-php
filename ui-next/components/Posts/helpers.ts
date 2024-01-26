import axios from "@/config/axios";

export interface Post {
    name: string;
    image_url: string;
    slug: string;
    created_at: string;
}

export const handleGetPosts = async () => {
    try {
        const response = await axios.get(`/api/blog-posts`);
        const data = await response.data;
        return data as Post[];
    } catch (error: any) {
        console.log(error.message);
    }
};
