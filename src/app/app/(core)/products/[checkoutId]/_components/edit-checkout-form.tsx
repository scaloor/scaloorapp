'use client'

import { z } from 'zod'
import { createUpdateSchema } from 'drizzle-zod'
import { checkout } from '@/server/db/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCheckout } from './checkout-provider'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { Textarea } from '@/app/_components/ui/textarea'
import { Switch } from '@/app/_components/ui/switch'
import { Button } from '@/app/_components/ui/button'
import FileUploader from '@/app/_components/common/file-uploader'
import ImageUploader from '@/app/_components/common/image-uploader'
import { formatPriceToString } from '@/lib/utils'


const checkoutUpdateSchema = createUpdateSchema(checkout).extend({
    thumbnailFile: z.instanceof(File).optional(),
    productFileFile: z.instanceof(File).optional(),
})

type FormData = z.infer<typeof checkoutUpdateSchema>

export default function EditCheckoutForm() {
    const checkoutStore = useCheckout()

    // Initialize the form from the checkout store
    const form = useForm<FormData>({
        resolver: zodResolver(checkoutUpdateSchema),
        defaultValues: {
            id: checkoutStore.checkout.id,
            productName: checkoutStore.checkout.productName,
            productDescription: checkoutStore.checkout.productDescription,
            productPrice: checkoutStore.checkout.productPrice,
            billingType: checkoutStore.checkout.billingType,
            thumbnail: checkoutStore.checkout.thumbnail,
            productFile: checkoutStore.checkout.productFile,
            stripeProductId: checkoutStore.checkout.stripeProductId,
            customerName: checkoutStore.checkout.customerName,
            customerEmail: checkoutStore.checkout.customerEmail,
            customerPhone: checkoutStore.checkout.customerPhone,
            customerAddress: checkoutStore.checkout.customerAddress,
        }
    })

    // Update context when form values change
    const onFormChange = form.watch((data) => {
        checkoutStore.updateCheckout(data)
    })

    // Delete checkout
    const onDelete = async () => { }

    // Handle form submission
    function onSubmit(data: FormData) {
        console.log("Form data:", data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-full mx-auto">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <div>
                            <CardTitle>Checkout</CardTitle>
                            <CardDescription>
                                Edit your checkout.
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={onDelete}>Delete</Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="productName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Product Name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="productDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="resize-none"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                            placeholder="Product Description"
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="productPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={formatPriceToString(field.value!)}
                                            placeholder="100"
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === 'Backspace' ||
                                                    e.key === 'Delete' ||
                                                    e.key === 'Tab' ||
                                                    e.key === 'Escape' ||
                                                    e.key === 'Enter' ||
                                                    e.key === '.'
                                                ) {
                                                    if (e.key === '.' && e.currentTarget.value.includes('.')) {
                                                        e.preventDefault();
                                                    }
                                                    return;
                                                }

                                                if (!/[0-9]/.test(e.key)) {
                                                    e.preventDefault();
                                                    return;
                                                }

                                                if (e.currentTarget.value.includes('.')) {
                                                    const decimals = e.currentTarget.value.split('.')[1];
                                                    if (decimals && decimals.length >= 2) {
                                                        e.preventDefault();
                                                    }
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="customerName"
                                render={({ field }) => (
                                    <FormItem className="flex justify-between items-center">
                                        <FormLabel>Customer Name</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={(checked) => {
                                                    field.onChange(checked);
                                                    checkoutStore.toggleCustomerName();
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customerPhone"
                                render={({ field }) => (
                                    <FormItem className="flex justify-between items-center">
                                        <FormLabel>Customer Phone</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={(checked) => {
                                                    field.onChange(checked);
                                                    checkoutStore.toggleCustomerPhone();
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customerAddress"
                                render={({ field }) => (
                                    <FormItem className="flex justify-between items-center">
                                        <FormLabel>Customer Address</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={(checked) => {
                                                    field.onChange(checked);
                                                    checkoutStore.toggleCustomerAddress();
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormLabel>Product File</FormLabel>
                            <FileUploader
                                className="w-1/2"
                                value={checkoutStore.checkout.productFile.split("/").pop() ?? null}
                                onFileChange={(file) => {
                                    if (file) {
                                        form.setValue("productFileFile", file);
                                        form.setValue("productFile", file.name);
                                        checkoutStore.updateProductFile(file);
                                    }
                                }}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormLabel>Thumbnail</FormLabel>
                            <ImageUploader
                                className="w-1/2"
                                value={checkoutStore.checkout.thumbnail}
                                onImageChange={(file) => {
                                    if (file) {
                                        form.setValue("thumbnailFile", file);
                                        form.setValue("thumbnail", file.name);
                                        checkoutStore.updateThumbnailPath(URL.createObjectURL(file));
                                    } else {
                                        form.setValue("thumbnailFile", undefined);
                                        form.setValue("thumbnail", null);
                                    }
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}
