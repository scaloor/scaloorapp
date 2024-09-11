'use client';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { CreateProductSchema, PricingTypeEnum } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Input } from "@/app/_components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import ImageUpload from "@/app/_components/common/image-upload";
import { Button } from "@/app/_components/ui/button";
import { uploadFile } from "@/lib/supabase/client";
import { FormError } from "@/app/_components/common/form-error";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { z } from "zod";
import { toast } from "sonner";

export default function CreateProductForm() {
    const [isPending, startTransition] = useTransition();
    const [formError, setFormError] = useState<string>("");
    const router = useRouter();
    const form = useForm<z.infer<typeof CreateProductSchema>>({
        resolver: zodResolver(CreateProductSchema),
        defaultValues: {
            defaultPrice: 0,
        },
    });

    const onSubmit = async (formData: z.infer<typeof CreateProductSchema>) => {
        setFormError("");
        // TODO: Implement product creation logic here
        /* const file = form.getValues('productImage');
        const path = `product-images/${formData.name}`;
        let productImagePath: string | undefined;

        startTransition(async () => {
            if (file) { 
                const { data, error } = await uploadFile(file, path);
                if (error) return setFormError(error?.message);
                if (!data) return setFormError("Unable to upload product image");
                productImagePath = data.path;
            }

            // TODO: Implement product creation logic here
            console.log("Product details:", {
                ...formData,
                ...(productImagePath ? { productImage: productImagePath } : {}),
            });

            // Redirect or show success message
            // router.push('/products');
        }); */
        toast(JSON.stringify(formData))
    }

    return (
        <Card className="mt-5">
            <div className="flex justify-center flex-col">
                <CardHeader>
                    <CardTitle>Create New Product</CardTitle>
                    <CardDescription>
                        Add a new product to your catalog.
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
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Product Name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="pricingType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pricing Type</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="grid grid-cols-2 gap-2"
                                            >
                                                {Object.values(PricingTypeEnum.Values).map((type) => (
                                                    <FormItem key={type} className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value={type} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {type.replace('_', ' ')}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="defaultPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Default Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                disabled={isPending}
                                                placeholder="0.00"
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="productImage"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-left">Product Image</FormLabel>
                                        <FormControl className="w-full">
                                            <ImageUpload form={form} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormError message={formError} />
                            <div className="flex justify-center">
                                <Button type="submit"
                                    disabled={isPending}
                                    className="dark:text-white min-w-64 max-w-sm"
                                >
                                    Create Product
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </div>
        </Card>
    )
}
