'use client';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { CreateBusinessSchema } from "./schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Input } from "@/app/_components/ui/input";
import ImageUpload from "@/app/_components/common/image-upload";
import { Button } from "@/app/_components/ui/button";
import { uploadFile } from "@/lib/supabase/client";
import { FormError } from "@/app/_components/common/form-error";
import { InsertUser } from "@/server/db/schema";
import CountryDropdown from "@/app/_components/common/countries-dropdown";
import { createBusiness } from "@/server/actions/api/onboarding";
import { useRouter } from "next/navigation";


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
        /* return console.log(await getAuthUserDetails()) */
        setFormError("");
        const file = form.getValues('businessLogo');
        const path = `business-logo/${formData.name}`; //TODO: Change to businessId
        let businessLogoPath: string | undefined;
        startTransition(async () => {
            if (!!file) {
                // Upload the business logo to supabase storage
                const { data, error } = await uploadFile(file, path);
                if (error) return setFormError(error?.message);
                if (!data) return setFormError("Unable to upload business logo");
                businessLogoPath = data.path;
            }
            // Create the business in the database
            const { url, error } = await createBusiness({
                name: formData.name,
                email: formData.businessEmail,
                country: formData.country,
                logo: businessLogoPath || "",
                userId: user.id!
            });

            if (error) return setFormError(error);
            if (!url) return setFormError("Unable to create subscription");
            router.push(url);

        });
    }

    return (
        <div className="mt-5">
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
                                    <ImageUpload form={form} value="businessLogo" />
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
        </div>
    )
}