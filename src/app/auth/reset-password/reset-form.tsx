"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "../_components/schemas";
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
import { FormSuccess } from "@/app/_components/common/form-success";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { resetPassword } from "@/server/actions/auth/reset-password";

export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            resetPassword(data)
                .then((data) => {
                    setSuccess(data?.success);
                }).catch(() => () => setError("Something went wrong"));
        });
    };

    return (
        <section className="h-[calc(100vh-57px)] flex justify-center items-center">
            <Card className="mx-auto max-w-md min-w-[400px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter an email linked to your account.
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
                            </div>
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="w-full"
                            >
                                Send reset email
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    );
};