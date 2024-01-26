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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import Spinner from "../ui/Spinner";
import { useToast } from "../ui/use-toast";

axios.defaults.withCredentials = true;

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    await axios.get(`/backend/sanctum/csrf-cookie`, {
        withCredentials: true,
    });
    type Res = AxiosResponse<{
        id: string;
        name: string;
        email: string;
        email_verified_at: string;
        created_at: string;
        updated_at: string;
    }>;
    const result = await axios<z.infer<typeof loginSchema>, Res>({
        url: `/backend/api/login`,
        method: "POST",
        data,
        withCredentials: true,
    });
    return result.data;
};

const getCurrentUser = async () => {
    const result = await axios.get(`/backend/api/user`, {
        withCredentials: true,
    });
    return result.data;
};
export default function Login() {
    const [, setSession] = useSession();

    const { push } = useRouter();
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof loginSchema>) => mutate(data);

    const { isPending, mutate } = useMutation({
        mutationFn: handleSubmit,
        onSuccess: (data) => {
            setSession({
                id: data.id,
                name: data.name,
            });
            refetch();
            push("/");
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const { isLoading, data, refetch } = useQuery({
        queryFn: getCurrentUser,
        queryKey: ["user"],
        retry: false,
    });

    if (isLoading) {
        return (
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        Loading...
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-center">Please wait...</p>
                </CardContent>
            </Card>
        );
    }

    if (data) {
        return (
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        Welcome back, {data.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-center">You are logged in.</p>
                </CardContent>
                <CardFooter className="flex gap-3 justify-evenly">
                    <Button
                        variant={"destructive"}
                        onClick={async () => {
                            await axios.post(`/backend/api/logout`, {
                                withCredentials: true,
                            });
                            push("/");
                            refetch();
                        }}
                    >
                        Logout
                    </Button>

                    <Link href="/">
                        <Button>Home</Button>
                    </Link>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            Login
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter your email and password to login to your
                            account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                                            required
                                            type="email"
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
                                            required
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
                        <Button className="w-full flex gap-3">
                            {isPending && <Spinner />}
                            Sign in
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
