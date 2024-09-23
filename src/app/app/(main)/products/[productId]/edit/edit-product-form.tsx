'use client'

import { useForm } from "react-hook-form";
import { z } from "zod";
import { EditProductSchema, PricingTypeEnum } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { uploadFile } from "@/lib/supabase/client";
import { SelectProduct } from "@/server/db/schema";
import { formatPriceToNumber, formatPriceToString } from "@/lib/utils";
import { toast } from "sonner";
import { FormError } from "@/app/_components/common/form-error";
import ImageUpload from "@/app/_components/common/image-upload";
import { Button } from "@/app/_components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/_components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/app/_components/ui/form";
import { RadioGroup } from "@/app/_components/ui/radio-group";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Input } from "@/app/_components/ui/input";
import { editProductAction } from "@/server/actions/api/product/edit-product";

type EditProductFormProps = {
    product: SelectProduct
}

export default function EditProductForm({ product }: EditProductFormProps) {
    const [isPending, startTransition] = useTransition();
    const [formError, setFormError] = useState<string>("");
    const router = useRouter();

    const form = useForm<z.infer<typeof EditProductSchema>>({
        resolver: zodResolver(EditProductSchema),
        defaultValues: {
            name: product.name,
            pricingType: "one_time", // TODO: Add recurring
            defaultPrice: formatPriceToString(product.defaultPrice),
        }
    });

    const onSubmit = async (formData: z.infer<typeof EditProductSchema>) => {
        setFormError("");
        const file = form.getValues('productImage');
        const path = `business/${product.businessId}/product-images`;
        let productImagePath: string | undefined;

        startTransition(async () => {
            if (file) {
                const { data, error } = await uploadFile(file, path);
                if (error) return setFormError(error?.message);
                if (!data) return setFormError("Unable to upload product image");
                productImagePath = data.path;
            }

            const { success, error } = await editProductAction({
                id: product.id,
                name: formData.name,
                billingType: formData.pricingType,
                defaultPrice: formatPriceToNumber(formData.defaultPrice),
                ...(productImagePath ? { image: productImagePath } : {}),
                businessId: product.businessId,
            })

            if (error) return setFormError(error);
            toast.success("Product updated successfully");
            router.push('/products');


        })
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
                                        <FormDescription>
                                            Recurring payments (subscriptions) are not yet supported.
                                        </FormDescription>
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
                                                type="text"
                                                disabled={isPending}
                                                placeholder="$0.00"
                                                value={field.value ? (field.value.toString().startsWith('$') ? field.value : `$${field.value}`) : ''}
                                                onKeyDown={(e) => {
                                                    const key = e.key;
                                                    if (
                                                        !/[\d.$]/.test(key) &&
                                                        !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key)
                                                    ) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    let value = e.target.value.replace(/[^\d.]/g, '');
                                                    const parts = value.split('.');
                                                    if (parts[1] && parts[1].length > 2) {
                                                        parts[1] = parts[1].slice(0, 2);
                                                        value = parts.join('.');
                                                    }
                                                    field.onChange(`$${value}`);
                                                }}
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
                                            <ImageUpload form={form} value="productImage" />
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
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </div>
        </Card>
    )

}