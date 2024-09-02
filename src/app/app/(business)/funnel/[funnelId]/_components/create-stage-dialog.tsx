'use client';
import React, { useRef, useState, useTransition } from 'react'
import { Button } from '@/app/_components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/app/_components/ui/dialog';
import { Input } from '@/app/_components/ui/input';
import { useRouter } from 'next/navigation';
import { EditStageSchema } from './schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/_components/ui/form';
import { FormError } from '@/app/_components/common/form-error';
import { urlSafePattern } from '@/lib/constants';
import { addStage } from '@/server/data/stage';

type CreateStageDialogProps = {
    funnelId: string;
    next_stage: number;
}

export default function CreateStageDialog({ funnelId, next_stage }: CreateStageDialogProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [formError, setFormError] = useState<string>("");
    const form = useForm<z.infer<typeof EditStageSchema>>({
        resolver: zodResolver(EditStageSchema),
    });

    const onSubmit = async (data: z.infer<typeof EditStageSchema>) => {
        setFormError("");
        console.log('Data:', data, next_stage);
        const stageDetails = {
            ...data,
            funnelId,
            order: next_stage,
        }
        startTransition(async () => {
            const { error } = await addStage(stageDetails);
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
                    Add Stage
                </Button>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-4'>
                <DialogHeader>
                    <DialogTitle>
                        Create New Stage
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex flex-col gap-4'
                    >
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
                            name="pathName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Path Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="page-1"
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
                                    <FormDescription>Path name can only contain letters, numbers, hyphens, underscores, and periods.</FormDescription>
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