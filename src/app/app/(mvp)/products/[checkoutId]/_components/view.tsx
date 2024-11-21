'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from '@/app/_components/ui/card'
import { SelectCheckout } from '@/server/db/schema';
import { Input } from "@/app/_components/ui/input";
import Image from 'next/image';
import FileUpload from '@/app/_components/common/file-upload';
import { Textarea } from '@/app/_components/ui/textarea';
import { Switch } from '@/app/_components/ui/switch';
import { Label } from '@/app/_components/ui/label';
import { useCheckout } from './checkout-provider';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 100; // 100MB

const EditCheckoutSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  price: z.string(),
  thumbnail: z.instanceof(File).refine((file) => file.size <= MAX_UPLOAD_SIZE, { message: "File size must be less than 10MB" }).optional(),
  file: z.instanceof(File).refine((file) => file.size <= MAX_UPLOAD_SIZE, { message: "File size must be less than 100MB" }),
});

type CheckoutViewProps = {
  checkout: SelectCheckout
}

export default function CheckoutView({ checkout }: CheckoutViewProps) {
  const checkoutStore = useCheckout()
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [useSamePhoto, setUseSamePhoto] = useState(true)
  const form = useForm<z.infer<typeof EditCheckoutSchema>>({
    resolver: zodResolver(EditCheckoutSchema),
    defaultValues: {
      name: checkout.productName,
      description: checkout.productDescription ?? "",
      price: checkout.productPrice.toString(),
    }
  });

  const thumbnail = checkout.thumbnail ?? '';
  const filename = checkout.productFile.split("/").pop();

  const onSubmit = async (formData: z.infer<typeof EditCheckoutSchema>) => {
    toast.success("Product updated successfully", { description: JSON.stringify(formData) });
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>
              View your checkout.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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
                      disabled={isPending}
                      placeholder="100"
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
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Label>Customer Name</Label>
                <Switch onCheckedChange={checkoutStore.toggleCustomerName} />
              </div>
              <div className="flex justify-between items-center">
                <Label>Customer Mobile</Label>
                <Switch onCheckedChange={checkoutStore.toggleCustomerPhone} />
              </div>
              <div className="flex justify-between items-center">
                <Label>Customer Address</Label>
                <Switch onCheckedChange={checkoutStore.toggleCustomerAddress} />
              </div>
            </div>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-left">Product File</FormLabel>
                  <FormControl className="w-full">
                    <FileUpload form={form} value="file" initialURL={filename} accept='DOCUMENT' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-left">Thumbnail</FormLabel>
                  <FormControl className="w-1/2">
                    <FileUpload form={form} value="thumbnail" initialURL={thumbnail} accept='IMAGE' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


          </CardContent>
        </Card>
      </form>
    </Form>
  )
}