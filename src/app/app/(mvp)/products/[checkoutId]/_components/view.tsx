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

const MAX_UPLOAD_SIZE = 1024 * 1024 * 100; // 100MB

const EditCheckoutSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  price: z.string(),
  productImage: z.instanceof(File).refine((file) => file.size <= MAX_UPLOAD_SIZE, { message: "File size must be less than 10MB" }).optional(),
  file: z.instanceof(File).refine((file) => file.size <= MAX_UPLOAD_SIZE, { message: "File size must be less than 100MB" }),
});

type CheckoutViewProps = {
  checkout: SelectCheckout
}

export default function CheckoutView({ checkout }: CheckoutViewProps) {
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
            <div>
              Thumbnail
              {checkout.thumbnail && <Image src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/scaloor-bucket/${checkout.thumbnail}`} alt="Product Image" width={100} height={100} />}
            </div>
            <div>
              Product File
              <Image src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/scaloor-bucket/${checkout.productFile}`} alt="Product File" width={100} height={100} />
            </div>

          </CardContent>
        </Card>
      </form>
    </Form>
  )
}