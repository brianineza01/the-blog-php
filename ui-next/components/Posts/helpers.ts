export interface Post {
    name: string;
    image_url: string;
    slug: string;
    created_at: string;
}

export const handleGetPosts = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/blog-posts");
    const data = await response.json();
    console.log(data);
    return data as Post[];
};
