"use client";

import Link from "next/link";

const PostCard = ({
    img,
    title,
    slug,
    createdAt,
}: {
    img: string;
    title: string;
    slug: string;
    createdAt: string;
}) => {
    return (
        <Link href={`/${slug}`}>
            <div className="flex flex-col gap-1 items-center bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                <img
                    alt={`img-${title}`}
                    className="aspect-content overflow-hidden rounded-lg object-cover"
                    height="200"
                    src={img}
                    width="200"
                />
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    {title}
                </h3>
                {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                </p> */}
                <span>{createdAt}</span>
            </div>
        </Link>
    );
};

export default PostCard;
