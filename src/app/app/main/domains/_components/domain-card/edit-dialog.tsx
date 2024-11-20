'use client'
import { useState, useTransition } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTrigger } from '@/app/_components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { Button } from '@/app/_components/ui/button'
import { toast } from 'sonner'
import { domainNamePattern } from '@/lib/constants'
import { editDomainAction } from '@/server/actions/protected/domain'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormError } from '@/app/_components/common/form-error'

const EditScaloorDialogSchema = z.object({
    domainName: z.string().min(2, { message: 'Domain name must be at least 2 characters.' }).max(30, { message: 'Domain name must be at most 30 characters.' }),
});

type EditScaloorDialogProps = {
    domainId: string
    domainName: string
}

export default function EditScaloorDialog({ domainId, domainName }: EditScaloorDialogProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition();
    const [formError, setFormError] = useState<string>("");
    const form = useForm<z.infer<typeof EditScaloorDialogSchema>>({
        resolver: zodResolver(EditScaloorDialogSchema),
        defaultValues: {
            domainName: domainName
        }
    });

    const onSubmit = async (data: z.infer<typeof EditScaloorDialogSchema>) => {
        setFormError("");
        const { domainName } = data;

        startTransition(async () => {
            const { success, error } = await editDomainAction(domainId, domainName)
            if (error) {
                setFormError(error);
            }
            if (success) {
                toast.success('Domain updated successfully')
                form.reset();
                setIsOpen(false)
                router.refresh();
            }
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">Edit</Button>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-4'>
                <DialogHeader>
                    <p className='text-lg font-semibold'>Edit domain</p>
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
                                    <div className='grid grid-cols-2 items-center gap-2'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='example'
                                                onKeyDown={(e) => {
                                                    if (
                                                        !domainNamePattern.test(e.key) &&
                                                        e.key !== 'Backspace' &&
                                                        e.key !== 'Delete'
                                                    ) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    const sanitizedValue = e.target.value.replace(/[^A-Za-z0-9\s-]/g, ''); // Corrected regex
                                                    field.onChange(sanitizedValue);
                                                }}
                                            />
                                        </FormControl>
                                        <p className='text-sm'>.scaloor.com</p>
                                    </div>
                                    <FormDescription>The domain name can only contain alphanumeric characters, hypens and spaces. Other characters will be automatically removed.</FormDescription>
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