import React from "react";
import CreatePostForm from "@/components/CreatePostForm/Index";

const page = () => {
    return (
        <main className="flex flex-col items-center justify-center px-4 py-6 md:px-6 md:py-12 lg:py-16">
            <div className="w-full max-w-4xl mx-auto">
                <CreatePostForm />
            </div>
        </main>
    );
};

export default page;
