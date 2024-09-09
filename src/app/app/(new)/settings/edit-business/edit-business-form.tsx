'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { EditBusinessSchema } from "./schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Input } from "@/app/_components/ui/input";
import MaxWidthWrapper from "@/app/_components/common/max-width-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import ImageUpload from "@/app/_components/common/image-upload";
import { Button } from "@/app/_components/ui/button";
import { uploadFile } from "@/lib/supabase/client";
import { FormError } from "@/app/_components/common/form-error";
import { addBusiness, updateBusinessColumn } from "@/server/data/business";
import { useRouter } from "next/navigation";
import { updateUser } from "@/server/data/users";
import { InsertBusiness } from "@/server/db/schema";
import { stripeSession } from "@/server/actions/stripe";
import CountryDropdown from "@/app/_components/common/countries-dropdown";
import { capitalizeFirstLetter } from "@/lib/utils";
import ErrorPage from "@/app/_components/common/error-page";

type EditBusinessFormProps = {
    business: InsertBusiness;
}

export default function EditBusinessForm({ business }: EditBusinessFormProps) {
    const [isPending, startTransition] = useTransition();
    const [formError, setFormError] = useState<string>("");
    const router = useRouter();
    const form = useForm<z.infer<typeof EditBusinessSchema>>({
        resolver: zodResolver(EditBusinessSchema),
        defaultValues: {
            businessEmail: business.businessEmail,
            name: business.name,
            country: business.country,
        },
    });

    if (!business.id) return <ErrorPage errorMessage="Business not found" />

    const onSubmit = async (formData: z.infer<typeof EditBusinessSchema>) => {
        setFormError("");
        console.log('Form data:', formData)
        const file = form.getValues('businessLogo');
        const path = `business-logo/${formData.name}`;
        let businessLogoPath: string | undefined;
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
            const country = capitalizeFirstLetter(formData.country);
            const { error } = await updateBusinessColumn({
                id: business.id!,
                ...formData,
                country,
                businessLogo: businessLogoPath,

            })
            if (error) {
                setFormError(error?.message);
            } else {
                router.push('/account')
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
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem className="w-full flex flex-col">
                                            <FormLabel>Country</FormLabel>
                                            <div>
                                                <CountryDropdown form={form} defaultValue={business.country} />
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
                                <div className='flex justify-end'>
                                    <Button type="submit"
                                        disabled={isPending}
                                        className="dark:text-white max-w-[200px]"
                                    >
                                        Update Business
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </div>
            </Card>
        </MaxWidthWrapper>
    )
}