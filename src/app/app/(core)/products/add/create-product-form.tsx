"use client"

import { useEffect, useState, useTransition } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { useForm } from 'react-hook-form'
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import { Switch } from "@/app/_components/ui/switch"
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Textarea } from "@/app/_components/ui/textarea"
import { AnimatePresence, motion } from 'motion/react'
import { addCheckoutAction } from '@/server/actions/protected/checkout/add';
import { scaloorId } from '@/server/db/schema/defaults';
import { uploadFile } from '@/lib/supabase/client';
import { FormError } from '@/app/_components/common/form-error';
import { useAppStore } from '../../_components/stores/app-store';
import { Loading } from '@/app/_components/common/loading';
import { SCALOOR_BUCKET } from "@/lib/constants";
import ImageUploader from "@/app/_components/common/image-uploader";
import FileUploader from "@/app/_components/common/file-uploader";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 100; // 100MB

const CreateCheckoutSchema = z.object({
    productName: z.string().min(1, { message: "Name is required" }),
    productDescription: z.string().optional(),
    productPrice: z.string(),
    thumbnail: z.instanceof(File).refine((file) => file.size <= MAX_UPLOAD_SIZE, { message: "File size must be less than 10MB" }).optional(),
    productFile: z.instanceof(File).refine((file) => file.size <= MAX_UPLOAD_SIZE, { message: "File size must be less than 100MB" }),
});

type FormData = z.infer<typeof CreateCheckoutSchema>

export default function CreateProductForm() {
    const { organizations } = useAppStore()
    const organizationId = organizations?.[0]?.id
    const [isPending, startTransition] = useTransition();
    const [formError, setFormError] = useState<string>("");
    const router = useRouter();

    // Initialize form with default values
    const form = useForm<FormData>({
        resolver: zodResolver(CreateCheckoutSchema),
    });

    const [useSamePhoto, setUseSamePhoto] = useState(true)
    const [showDescription, setShowDescription] = useState(false)
    const [checkoutType, setCheckoutType] = useState("embedded")

    const onSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const { productName, productDescription, productPrice, productFile, thumbnail } = formData;
            // Create the file paths and upload the files
            const checkoutId = scaloorId("chk")
            const uploadPromises = [
                uploadFile(productFile, `organization/${organizationId}/checkout/product/${checkoutId}/${productFile.name}`)
            ];
            if (!!thumbnail) {
                uploadPromises.push(
                    uploadFile(thumbnail, `organization/${organizationId}/checkout/thumbnail/${checkoutId}/${thumbnail.name}`)
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
            const filePath = `${SCALOOR_BUCKET}/${results[0]!.data!.path}`
            let thumbnailPath = '';
            if (!!thumbnail) {
                thumbnailPath = `${SCALOOR_BUCKET}/${results[1]!.data!.path}`
            }
            await addCheckoutAction({ checkoutId, productName, productDescription, productPrice, filePath, thumbnailPath });
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

    if (isPending) return <Loading />

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Sell your digital products online</CardTitle>
                        <CardDescription>
                            Upload any file, embed your checkout on your website and let us handle the product delivery.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="productName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value ?? ''}
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
                                            name="productDescription"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            className="resize-none"
                                                            onChange={field.onChange}
                                                            onBlur={field.onBlur}
                                                            name={field.name}
                                                            ref={field.ref}
                                                            placeholder="Product Description"
                                                            value={field.value ?? ""}
                                                            disabled={isPending}
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
                            name="productPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value ?? ''}
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
                                        name="thumbnail"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel className="text-left">Product Image</FormLabel>
                                                <FormControl className="w-full">                                                    
                                                    <ImageUploader
                                                        className="w-full"
                                                        value={null}
                                                        onImageChange={(file) => {
                                                            if (file) {                                        
                                                                form.setValue("thumbnail", file);
                                                            } else {
                                                                form.setValue("thumbnail", undefined);
                                                            }
                                                        }}
                                                    />
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
                                name="productFile"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-left">Product File</FormLabel>
                                        <FormControl className="w-full">
                                            <FileUploader
                                                className="w-full"
                                                value={null}
                                                onFileChange={(file) => {
                                                    if (file) {
                                                        form.setValue("productFile", file);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {formError && <FormError message={formError} />}
                        <div className="flex items-center justify-between pt-4 float-right">
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