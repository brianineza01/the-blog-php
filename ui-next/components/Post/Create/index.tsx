"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Editor as NovelEditor } from "novel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handleCreatePostRequest } from "./helpers";
import formSchema from "./schema";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Spinner from "../../ui/Spinner";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

export default function CreatePostForm() {
    const { push } = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { mutate, isPending } = useMutation({
        mutationFn: handleCreatePostRequest,
        onSuccess: (data) => {
            if (data.status === "error") {
            }
            console.log("success");
            toast({
                title: "Post Created",
                description: "Your post has been created successfully",
                variant: "default",
            });
            push("/");
        },
        onError: (err) => {
            console.log("error");
            toast({
                title: "Error",
                description: err.message ?? "Something went wrong",
                variant: "destructive",
            });
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        mutate({
            name: data.title,
            content: data.content,
            image: data.post_image,
        });
    };

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center mb-6">
                            Create a Blog Post
                        </CardTitle>
                        <CardDescription className="text-center">
                            To create a blog post, enter the title, cover image,
                            and the content of the blog post!
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter the blog post title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="post_image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cover Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    field.onChange(
                                                        e.target.files?.[0]
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <NovelEditor
                                                onDebouncedUpdate={(editor) =>
                                                    field.onChange(
                                                        editor?.getJSON()
                                                    )
                                                }
                                                defaultValue={{
                                                    type: "doc",
                                                    content: [],
                                                }}
                                                disableLocalStorage
                                                className="flex min-h-[200px] w-full border-box rounded-md border border-input bg-background px-3 py text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full flex gap-3"
                            // type="submit"
                            variant={"default"}
                        >
                            {isPending ? <Spinner /> : null}
                            Publish Post
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
