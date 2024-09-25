"use client"

import { Button } from '@/app/_components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/app/_components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/_components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Input } from '@/app/_components/ui/input';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { domainNamePattern, validDomainRegex } from '@/lib/constants';
import { FormError } from '@/app/_components/common/form-error';
import { addCustomDomainAction } from '@/server/actions/api/domain';


const AddCustomDialogSchema = z.object({
    domainName: z.string().min(2, { message: 'Domain name must be at least 2 characters.' })
        .max(253, { message: 'Domain name must be at most 253 characters.' })
        .regex(validDomainRegex, { message: 'Please enter a valid domain name.' }),
});

type AddCustomDialogProps = {}

export default function AddCustomDialog({ }: AddCustomDialogProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition();
    const [formError, setFormError] = useState<string>("");
    const form = useForm<z.infer<typeof AddCustomDialogSchema>>({
        resolver: zodResolver(AddCustomDialogSchema),
    });

    const onSubmit = async (data: z.infer<typeof AddCustomDialogSchema>) => {
        setFormError("");
        const { domainName } = data;

        startTransition(async () => {
            const { success, error } = await addCustomDomainAction(domainName)
            if (error) {
                setFormError(error);
            }
            if (success) {
                toast.success('Domain added successfully')
                form.reset();
                setIsOpen(false)
                router.refresh();
            }
        });
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8">
                    Add custom domain
                </Button>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-4'>
                <DialogHeader>
                    <p className='text-lg font-semibold'>Add custom domain</p>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex flex-col gap-4 justify-end'>
                        <FormField
                            control={form.control}
                            name="domainName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Domain</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='yourdomain.com'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormError message={formError} />
                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={isPending}
                            >
                                Add
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent >
        </Dialog >
    )
}