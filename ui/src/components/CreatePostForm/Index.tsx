import { useForm } from "react-hook-form";
import formSchema from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../lib/Button";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    Form,
} from "../lib/Form";
import { Input } from "../lib/Input";

import { Editor } from "novel";
import { useMutation } from "@tanstack/react-query";
import { handleCreatePostRequest } from "./helpers";

const CreatePostForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { mutate, isPending } = useMutation({
        mutationFn: handleCreatePostRequest,
        onSuccess: () => {
            console.log("success");
        },
        onError: () => {
            console.log("error");
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormDescription>
                                The title of your blog post
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* form field to add an image */}
                <FormField
                    control={form.control}
                    name="post_image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormDescription>
                                The image of your blog post
                            </FormDescription>
                            <FormControl>
                                <Input
                                    placeholder="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        field.onChange(e.target.files?.[0]);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Body</FormLabel>
                            <FormDescription>
                                The body of your blog post
                            </FormDescription>
                            <FormControl>
                                <Editor
                                    onDebouncedUpdate={(editor) =>
                                        field.onChange(editor?.getJSON())
                                    }
                                    defaultValue={{
                                        type: "doc",
                                        content: [],
                                    }}
                                    disableLocalStorage={true}
                                    className="flex min-h-[80px] w-full border-box rounded-md border border-input bg-background px-3 py text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Creating..." : "Create Post"}
                </Button>
            </form>
        </Form>
    );
};

export default CreatePostForm;
