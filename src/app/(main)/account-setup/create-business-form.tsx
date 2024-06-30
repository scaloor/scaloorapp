'use client';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { CreateBusinessSchema } from "./schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Input } from "@/app/_components/ui/input";
import MaxWidthWrapper from "@/app/_components/common/max-width-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { PhoneInput } from "@/app/_components/ui/phone-input";
import ImageUpload from "@/app/_components/common/image-upload";
import { Button } from "@/app/_components/ui/button";
import { uploadFile } from "@/lib/supabase/client";
import { FormError } from "@/app/_components/common/form-error";
import { addBusiness } from "@/server/data/business";
import { useRouter } from "next/navigation";
import { updateUser } from "@/server/data/users";
import { User } from "@/server/db/types";

type createBusinessFormProps = {
    user: User
}

export default function CreateBusinessForm({ user }: createBusinessFormProps) {
    const [isPending, startTransition] = useTransition();
    const [formError, setFormError] = useState<string>("");
    const router = useRouter();
    const form = useForm<z.infer<typeof CreateBusinessSchema>>({
        resolver: zodResolver(CreateBusinessSchema),
        defaultValues: {
            businessEmail: user.email,
        },
    });

    const onSubmit = async (formData: z.infer<typeof CreateBusinessSchema>) => {
        setFormError("");
        const file = form.getValues('businessLogo');
        const path = `business-logo/${formData.name}`;
        if (!file) return setFormError("Please upload a business logo");
        startTransition(async () => {
            // Upload the business logo to supabase storage
            const { data, error } = await uploadFile(file, path);
            if (error) return setFormError(error.message);
            // Create the business in the database
            if (!!data) {
                const businessDetails = {
                    ...formData,
                    businessLogo: data.path,
                }
                console.log('Business created:');
                const dbBusiness = await addBusiness(businessDetails);
                if (!dbBusiness) setFormError("Unable to create business");
                const newUser = {
                    ...user,
                    businessId: dbBusiness.id,
                }
                const dbUser = await updateUser(newUser)
                if (!dbUser) setFormError("Unable to update user");

                router.push('/account');
            }
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
                                        <FormItem className="w-full">
                                            <FormLabel className="text-left">Logo</FormLabel>
                                            <FormControl className="w-full">
                                                <ImageUpload form={form} />
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
                                <div className="flex justify-between gap-2 w-full">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
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
                                </div>
                                <div className="flex justify-between gap-2 w-full">
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
                                <FormError message={formError} />
                                <Button type="submit"
                                    disabled={isPending}
                                >
                                    Save
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </div>
            </Card>
        </MaxWidthWrapper >
    )
}