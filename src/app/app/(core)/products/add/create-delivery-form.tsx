"use client"

import { Camera, FileChartColumn, MonitorPlay, Upload, Youtube } from 'lucide-react'
import { useEffect, useState, useTransition } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { useForm } from 'react-hook-form'
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group"
import { Switch } from "@/app/_components/ui/switch"
import ImageUpload from '@/app/_components/common/image-upload'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateCheckoutSchema } from './form-schema'
import { z } from 'zod'
import { toast } from 'sonner'
import { Textarea } from "@/app/_components/ui/textarea"
import { AnimatePresence, motion } from 'motion/react'
import { addCheckoutAction } from '@/server/actions/protected/checkout/add';
import { scaloorId } from '@/server/db/schema/defaults';
import { uploadFile } from '@/lib/supabase/client';
import { FormError } from '@/app/_components/common/form-error';
import FileUpload from '@/app/_components/common/file-upload';

type CreateDeliveryFormProps = {
    businessId: string;
}

export default function CreateDeliveryForm({ businessId }: CreateDeliveryFormProps) {
    const [isPending, startTransition] = useTransition();
    const [formError, setFormError] = useState<string>("");
    const router = useRouter();
    const form = useForm<z.infer<typeof CreateCheckoutSchema>>({
        resolver: zodResolver(CreateCheckoutSchema),
    });
    const [useSamePhoto, setUseSamePhoto] = useState(true)
    const [showDescription, setShowDescription] = useState(false)
    const [checkoutType, setCheckoutType] = useState("embedded")

    const onSubmit = async (formData: z.infer<typeof CreateCheckoutSchema>) => {
        startTransition(async () => {
            const { name, description, price, productImage, file } = formData;
            // Create the file paths and upload the files
            const checkoutId = scaloorId("chk")
            console.log("thumbnail", !!productImage)
            const uploadPromises = [
                uploadFile(file, `business/${businessId}/checkout/product/${checkoutId}/${file.name}`)
            ];
            if (!!productImage) {
                uploadPromises.push(
                    uploadFile(productImage, `business/${businessId}/checkout/thumbnail/${checkoutId}/${productImage.name}`)
                );
            }
            const results = await Promise.all(uploadPromises);
            console.log("results", results)
            // Check if any of the uploads failed
            const failedUploads = results.some(result => !result.data);
            if (failedUploads) {
                toast.error("Failed to upload one or more files");
                return;
            }

            // Add the checkout to the database
            const filePath = results[0]!.data!.path
            let thumbnailPath = '';
            if (!!productImage) {
                thumbnailPath = results[1]!.data!.path
            }
            await addCheckoutAction({ checkoutId, name, description, price, filePath, thumbnailPath });
            toast.success("Product created successfully", { description: JSON.stringify(formData) });
            router.push(`/products/${checkoutId}`)
        });
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
            }
        };

        // Add the global event listener
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [form, onSubmit]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Sell your files online</CardTitle>
                        <CardDescription>
                            Upload any file, embed your checkout on your website and let us handle the product delivery.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
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
                        <div className="space-y-4">
                            <AnimatePresence>
                                {showDescription ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            disabled={isPending}
                                                            placeholder="Enter your product description"
                                                            className="resize-none"
                                                            rows={4}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex items-center justify-end">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="h-auto p-0 text-muted-foreground"
                                                onClick={() => setShowDescription(false)}
                                            >
                                                Remove description
                                            </Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="h-auto p-0 text-muted-foreground"
                                        onClick={() => setShowDescription(true)}
                                    >
                                        + Add description
                                    </Button>
                                )}
                            </AnimatePresence>
                        </div>

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Price"
                                            onKeyDown={(e) => {
                                                // Allow: backspace, delete, tab, escape, enter, decimal point
                                                if (
                                                    e.key === 'Backspace' ||
                                                    e.key === 'Delete' ||
                                                    e.key === 'Tab' ||
                                                    e.key === 'Escape' ||
                                                    e.key === 'Enter' ||
                                                    e.key === '.'
                                                ) {
                                                    // Check if there's already a decimal point
                                                    if (e.key === '.' && e.currentTarget.value.includes('.')) {
                                                        e.preventDefault();
                                                    }
                                                    return;
                                                }

                                                // Allow numbers only
                                                if (!/[0-9]/.test(e.key)) {
                                                    e.preventDefault();
                                                    return;
                                                }

                                                // Check decimal places
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
                            )} />
                        {/* 
                        // Need to add hosted option
                        <div className="space-y-3">
                            <Label>Lesson category</Label>
                            <RadioGroup
                                defaultValue="embedded"
                                onValueChange={setCheckoutType}
                                className="grid grid-cols-3 gap-4"
                            >
                                <Label
                                    htmlFor="embedded"
                                    className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer ${checkoutType === "embedded" ? "border-primary" : "border-muted"
                                        }`}
                                >
                                    <RadioGroupItem value="video" id="video" className="sr-only" />
                                    <MonitorPlay className="mb-2 h-6 w-6" />
                                    Embedded
                                </Label>
                                <Label
                                    htmlFor="hosted"
                                    className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer ${checkoutType === "hosted" ? "border-primary" : "border-muted"
                                        }`}
                                >
                                    <RadioGroupItem value="youtube" id="youtube" className="sr-only" />
                                    <Youtube className="mb-2 h-6 w-6" />
                                    Hosted
                                </Label>
                            </RadioGroup>
                        </div> */}

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Thumbnail image</Label>
                                <p className="text-sm text-muted-foreground">
                                    Use default image
                                </p>
                            </div>
                            <Switch
                                checked={useSamePhoto}
                                onCheckedChange={setUseSamePhoto}
                            />
                        </div>
                        <AnimatePresence>
                            {!useSamePhoto && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FormField
                                        control={form.control}
                                        name="productImage"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="text-left">Product Image</FormLabel>
                                                <FormControl className="w-full">
                                                    <FileUpload form={form} value="productImage" accept="IMAGE" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-left">Product File</FormLabel>
                                        <FormControl className="w-full">
                                            <FileUpload form={form} value="file" accept="DOCUMENT" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {formError && <FormError message={formError} />}
                        <div className="flex items-center justify-between pt-4">
                            <Button
                                type="submit"
                                className="bg-primary text-primary-foreground"
                            >
                                Continue
                                <span className="ml-2 text-sm text-primary-foreground/70">
                                    press Enter↵
                                </span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}