'use client'
import React, { useState, useTransition } from 'react'
import { EditUserSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InsertUser } from '@/server/db/schema/users';
import { z } from 'zod';
import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { FormError } from '@/app/_components/common/form-error';
import { Button } from '@/app/_components/ui/button';
import { updateUserColumns } from '@/server/data/users';
import ErrorPage from '@/app/_components/common/error-page';
import { useRouter } from 'next/navigation';
import { PhoneInput } from '@/app/_components/ui/phone-input';

type EditUserFormProps = {
    user: InsertUser;
}

export default function EditUserForm({ user }: EditUserFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [formError, setFormError] = useState<string>("");
    const form = useForm<z.infer<typeof EditUserSchema>>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            ...(user.mobile ? { mobile: user.mobile } : { mobile: undefined }),
        },
    });

    if (!user.id) return <ErrorPage errorMessage="User not found" />

    const onSubmit = async (data: z.infer<typeof EditUserSchema>) => {
        setFormError("");
        startTransition(async () => {
            const { error } = await updateUserColumns({
                id: user.id!,
                ...data,
            });
            if (error) {
                setFormError(error?.message);
            } else {
                router.push('/account')
            }
        });
    }

    return (
        <MaxWidthWrapper>
            <Card className='mt-5'>
                <CardHeader>
                    <CardTitle>Edit User</CardTitle>
                    <CardDescription>
                        Update your user details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4 justify-end"
                        >
                            <div className='grid grid-cols-2 gap-4'>
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="First Name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Last Name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="mobile"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile</FormLabel>
                                            <FormControl>
                                                <PhoneInput placeholder="Enter a phone number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                            <FormError message={formError} />
                            <div className='flex justify-end'>
                                <Button type="submit"
                                    disabled={isPending}
                                    className="dark:text-white max-w-[200px]"
                                >
                                    Update User
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </MaxWidthWrapper>
    )
}