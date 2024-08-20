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
import { business, InsertUser } from "@/server/db/schema";
import { stripeSession } from "@/server/actions/stripe";
import CountryDropdown from "@/app/_components/common/countries-dropdown";

type createBusinessFormProps = {
    user: InsertUser
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
        let businessLogoPath: string | undefined;
        //if (!file) return setFormError("Please upload a business logo");
        startTransition(async () => {
            if (!!file) {
                // Upload the business logo to supabase storage
                const { data, error } = await uploadFile(file, path);
                console.log('Data:', error);
                if (error) return setFormError(error?.message);
                if (!data) return setFormError("Unable to upload business logo");
                businessLogoPath = data.path;
            }
            // Create the business in the database

            const businessDetails = {
                ...formData,
                ...(businessLogoPath ? { businessLogo: businessLogoPath } : { businessLogo: null }),
            }

            const { dbBusiness } = await addBusiness(businessDetails);
            if (!dbBusiness) return setFormError("Unable to create business");
            const newUser = {
                ...user,
                businessId: dbBusiness.id,
            }
            const { dbUser } = await updateUser(newUser)
            if (!dbUser) setFormError("Unable to update user");

            // This should be updated to be dynamic for production
            const url = await stripeSession('funnels');
            if (!url) {
                setFormError("Unable to create subscription");
                return;
            };
            router.push(url);

        });
    }

    return (
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
                            {/* <FormField
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
                                /> */}
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem className="w-full flex flex-col">
                                        <FormLabel>Country</FormLabel>
                                        <div>
                                            <CountryDropdown form={form} />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )} />
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
                            <FormError message={formError} />
                            <Button type="submit"
                                disabled={isPending}
                                className="dark:text-white"
                            >
                                Next
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </div>
        </Card>
    )
}