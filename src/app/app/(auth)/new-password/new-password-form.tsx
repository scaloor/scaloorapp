"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewPasswordSchema } from "../_components/schemas";
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
import { newPassword } from "@/server/actions/public/auth/new-password";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";

export const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    setError("");

    startTransition(() => {
      newPassword(data)
        .then((data) => {
          setError(data?.error);
        }).catch(() => setError("Something went wrong"));
    });
  };

  return (
    <section className="h-[calc(100vh-57px)] flex justify-center items-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create a new password</CardTitle>
          <CardDescription>
            Your password must be at least 6 characters long.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
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
                Reset password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};