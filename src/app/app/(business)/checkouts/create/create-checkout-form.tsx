'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Input } from "@/app/_components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import ImageUpload from "@/app/_components/common/image-upload";
import { Button } from "@/app/_components/ui/button";
import { FormError } from "@/app/_components/common/form-error";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select";

// Define the schema based on the sample checkouts
const CreateCheckoutSchema = z.object({
    product: z.string().min(1, "Product name is required"),
    image: z.any().optional(),
    upsell: z.object({
        id: z.number(),
        name: z.string()
    }).nullable(),
    downsell: z.object({
        id: z.number(),
        name: z.string()
    }).nullable(),
    price: z.number().min(0, "Price must be a positive number"),
});

// Mock data for upsell/downsell options (replace with actual data in production)
const sampleProducts = [
    { id: 1, name: "Premium Subscription" },
    { id: 2, name: "Basic Package" },
    { id: 3, name: "Pro Bundle" },
    { id: 4, name: "Standard Plan" },
    { id: 5, name: "Enterprise Solution" },
];

export default function CreateCheckoutForm() {
    const [isPending, startTransition] = useTransition();
    const [formError, setFormError] = useState<string>("");
    const router = useRouter();
    const form = useForm<z.infer<typeof CreateCheckoutSchema>>({
        resolver: zodResolver(CreateCheckoutSchema),
        defaultValues: {
            price: 0,
            upsell: null,
            downsell: null,
        },
    });

    const onSubmit = async (formData: z.infer<typeof CreateCheckoutSchema>) => {
        setFormError("");
        startTransition(async () => {
            // TODO: Implement checkout creation logic here
            console.log("Checkout details:", formData);
            toast(JSON.stringify(formData));
            // Redirect or show success message
            // router.push('/checkouts');
        });
    }

    return (
        <Card className="mt-5">
            <div className="flex justify-center flex-col">
                <CardHeader>
                    <CardTitle>Create New Checkout</CardTitle>
                    <CardDescription>
                        Add a new checkout to your system.
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
                                name="product"
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
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
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
                                name="upsell"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Upsell Product</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(value ? JSON.parse(value) : null)}
                                            defaultValue={field.value ? JSON.stringify(field.value) : undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an upsell product" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {sampleProducts.map((product) => (
                                                    <SelectItem key={product.id} value={JSON.stringify(product)}>
                                                        {product.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="downsell"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Downsell Product</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(value ? JSON.parse(value) : null)}
                                            defaultValue={field.value ? JSON.stringify(field.value) : undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a downsell product" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {sampleProducts.map((product) => (
                                                    <SelectItem key={product.id} value={JSON.stringify(product)}>
                                                        {product.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="image"
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
                                    Create Checkout
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </div>
        </Card>
    )
}
