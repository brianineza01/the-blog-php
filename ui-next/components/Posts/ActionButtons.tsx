"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const ActionButtons = () => {
    const {} = useMutation({
        mutationFn: handleLikePost,
        onSuccess: () => {
            console.log("success");
        },
        onError: () => {
            console.log("error");
        },
    });

    return (
        <div className="flex gap-2">
            <Button className="w-full" variant="outline">
                <HeartIcon className="w-4 h-4 mr-2" />
                Like
            </Button>

            <Popover>
                <PopoverTrigger>
                    <Button className="w-full" variant="outline">
                        <TextIcon className="w-4 h-4 mr-2" />
                        Comment
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="width">Comment: </Label>
                        <Textarea
                            id="comment"
                            placeholder="Comment goes here...."
                            className=""
                        />
                    </div>
                    <Button>Save</Button>
                </PopoverContent>
            </Popover>
        </div>
    );
};

const handleLikePost = async (postId: number) => {
    await fetch("/backend/api/blog-posts/like", {
        method: "POST",
        body: JSON.stringify({ postId }),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const handleComment = async (postId: number, comment: string) => {
    await fetch("/backend/api/blog-posts/comment", {
        method: "POST",
        body: JSON.stringify({ postId, comment }),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
}

function TextIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 6.1H3" />
            <path d="M21 12.1H3" />
            <path d="M15.1 18H3" />
        </svg>
    );
}

export default ActionButtons;
