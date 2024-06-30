'use client';

import ExampleUpload from "@/app/_components/common/example-upload";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { CreateBusinessSchema } from "./schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useTransition } from "react";
import { Input } from "@/app/_components/ui/input";
import MaxWidthWrapper from "@/app/_components/common/max-width-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { PhoneInput } from "@/app/_components/ui/phone-input";

/* import ImageUpload from "@/app/_components/common/image-upload"; */

type createBusinessFormProps = {
    user_email: string
}

export default function CreateBusinessForm({ user_email }: createBusinessFormProps) {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof CreateBusinessSchema>>({
        resolver: zodResolver(CreateBusinessSchema),
        defaultValues: {
            businessEmail: user_email,
        },
    });

    const onSubmit = (data: z.infer<typeof CreateBusinessSchema>) => {
        // setError("");

        startTransition(() => {
            // Call the create business function with form data
        });
    }

    return (
        <MaxWidthWrapper>
            <Card className="mt-5">
                <div className="flex justify-center flex-col">
                    <CardHeader>
                        <CardTitle>Business Details</CardTitle>
                        <CardDescription>
                            Lets create your business account with scaloor. You can edit
                            these details at any time.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="grid gap-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Business Name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="businessEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Business Email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="businessPhone"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-left">Phone Number</FormLabel>
                                            <FormDescription className="text-left">
                                                Enter a phone number
                                            </FormDescription>
                                            <FormControl className="w-full">
                                                <PhoneInput placeholder="Enter a phone number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="businessLogo"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-left">Logo</FormLabel>
                                            <FormControl className="w-full">
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="123 Main Street"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="123 Main Street"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City/Town</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Melbourne"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <div className="flex justify-between gap-2 w-full">
                                    <FormField
                                        control={form.control}
                                        name="postCode"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Post or Zip Code</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="3000"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="VIC"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Country</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="Australia"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </div>
            </Card>
        </MaxWidthWrapper >
    )
}