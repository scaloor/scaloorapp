'use client'
import { Button } from '@/app/_components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/app/_components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/_components/ui/form'
import { Plus } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import { CreateFunnelSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/app/_components/ui/input'
import { useRouter } from 'next/navigation'
import { FormError } from '@/app/_components/common/form-error'
import { addFunnel } from '@/server/data/funnels'
import { urlSafePattern } from '@/lib/constants'

type CreateFunnelDialogProps = {
  businessId: string;
}


export default function CreateFunnelDialog({ businessId }: CreateFunnelDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string>("");
  const form = useForm<z.infer<typeof CreateFunnelSchema>>({
    resolver: zodResolver(CreateFunnelSchema),
  });

  const onSubmit = async (data: z.infer<typeof CreateFunnelSchema>) => {
    setFormError("");
    const funnelDetails = {
      ...data,
      businessId,
    }
    startTransition(async () => {
      const { error } = await addFunnel(funnelDetails);
      if (error) {
        setFormError(error?.message);
      } else {
        setIsOpen(false);
        router.refresh();
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='dark:text-white'>
          Create New Funnel
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-4'>
        <DialogHeader>
          <p className='text-lg font-semibold'>Create New Funnel</p>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4 justify-end'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Name"
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
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="subDomainName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Domain Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="mystore"
                      onKeyDown={(e) => {
                        if (
                          !urlSafePattern.test(e.key) &&
                          e.key !== 'Backspace' &&
                          e.key !== 'Delete'
                        ) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const sanitizedValue = e.target.value.replace(
                          /[^A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=%]/g,
                          ''
                        );
                        field.onChange(sanitizedValue);
                      }}
                    />
                  </FormControl>
                  <FormDescription>Sub domain can only contain letters, numbers, hyphens, underscores, and periods.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
            <FormError message={formError} />
            <div className='flex justify-end'>
              <Button type="submit"
                disabled={isPending}
                className="dark:text-white max-w-[200px]"
              >
                Create Funnel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}