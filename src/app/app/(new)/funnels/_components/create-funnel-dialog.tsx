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
import { funnelNamePattern } from '@/lib/constants'
import { createNewFunnelAction } from '@/server/actions/funnel'
import { toast } from 'sonner'

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
    const { name } = data;

    startTransition(async () => {
      const { error } = await createNewFunnelAction({ name, businessId });
      if (error) {
        setFormError(error?.message);
      } else {
        toast("Created new funnel", {
          description: name,
        })
        setIsOpen(false);
        router.refresh(); // May have to change this to revalidatePath
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
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
                      onKeyDown={(e) => {
                        if (
                          !funnelNamePattern.test(e.key) &&
                          e.key !== 'Backspace' &&
                          e.key !== 'Delete'
                        ) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const sanitizedValue = e.target.value.replace(/[^A-Za-z0-9\s]/g, '');
                        field.onChange(sanitizedValue);
                      }}
                    />
                  </FormControl>
                  <FormDescription>The funnel name can only contain alphanumeric characters and spaces. Other characters will be automatically removed.</FormDescription>
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