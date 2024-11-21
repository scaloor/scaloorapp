"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LoginSchema } from "../_components/schemas";
import { Input } from "@/app/_components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import { Button } from "@/app/_components/ui/button";
import { FormError } from "@/app/_components/common/form-error";
import { login } from "@/server/actions/public/auth/login";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle } from "@/server/actions/public/auth/login-google";


export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        setError("");

        startTransition(async () => {
            // Call login function with form data
            await login(data)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }
                })
                .catch(() => setError("Something went wrong"));
        })
    };

    const handleGoogleLogin = () => {
        setError("");
        startTransition(async () => {
            const { error } = await loginWithGoogle()
            setError(error);
        })
    };

    return (
        <section className="h-[calc(100vh-57px)] flex justify-center items-center">
            <Card className="mx-auto max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid gap-4"
                        >
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="john.doe@example.com"
                                                    type="email"
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
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="******"
                                                    type="password"
                                                />
                                            </FormControl>
                                            <Button
                                                size="sm"
                                                variant="link"
                                                asChild
                                                className="px-0 font-normal"
                                            >
                                                <Link href="/auth/reset-password">
                                                    Forgot password?
                                                </Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormError message={error} />
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="w-full"
                            >
                                Login
                            </Button>
                        </form>
                    </Form>
                    <Button
                        size="lg"
                        className="w-full"
                        variant="outline"
                        onClick={handleGoogleLogin}
                    >
                        <FcGoogle className="h-5 w-5 mr-2" />
                        Sign in with Google
                    </Button>
                    <Button
                        variant="link"
                        className="font-normal w-full"
                        size="sm"
                        asChild
                    >
                        <Link href="/register">
                            Don&apos;t have an account?
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </section>

    );
}
