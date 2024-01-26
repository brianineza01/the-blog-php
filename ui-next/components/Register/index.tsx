"use client";

import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";

const registerSchema = z
    .object({
        name: z.string().min(2, "Name is required"),
        email: z.string().email("Email is required"),
        password: z
            .string()
            .min(1, "Password is Required")
            .min(8, "Password is too short, should be 8 characters long"),
        passwordConfirmation: z.string().min(8),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
    });

const handleSubmit = async (data: z.infer<typeof registerSchema>) => {
    await fetch(`/backend/api/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.passwordConfirmation,
        }),
    });
};
export default function Register() {
    const { push } = useRouter();
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            passwordConfirmation: "",
        },
    });

    const onSubmit = (data: z.infer<typeof registerSchema>) => mutate(data);

    const { isPending, mutate } = useMutation({
        mutationFn: handleSubmit,
        onSuccess: () => {
            push("/login");
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-full lg:min-w-[500px] max-w-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            Register
                        </CardTitle>
                        <CardDescription className="text-center">
                            To register, please fill in the form below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            placeholder=""
                                            type="name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            placeholder="m@example.com"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password Confirmation</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="passwordConfirmation"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full flex" disabled={isPending}>
                            {isPending ? <Spinner /> : null}
                            Register
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
