"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EditStageSchema } from "./schema";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/_components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { updateStageColumns } from "@/server/data/stage";
import { FormError } from "@/app/_components/common/form-error";
import { toast } from "sonner"

type EditStageProps = {
    key: string;
    id: string;
    name: string;
    pathName: string;
}


export default function EditStage({ key, id, name, pathName }: EditStageProps) {
    const [isPending, startTransition] = useTransition();
    const [formError, setFormError] = useState<string>("");
    const router = useRouter();
    const form = useForm<z.infer<typeof EditStageSchema>>({
        resolver: zodResolver(EditStageSchema),
        defaultValues: {
            id: id,
            name: name,
            pathName: pathName,
        },
    });

    const onSubmit = (data: z.infer<typeof EditStageSchema>) => {
        startTransition(async () => {
            const { dbStage, error } = await updateStageColumns({
                id: data.id,
                name: data.name,
                pathName: data.pathName,
            })
            if (error) {
                setFormError(error);
                return;
            }
            if (!dbStage) {
                setFormError("Unable to update stage");
                return;
            }
            toast('Success', {
                description: 'Saves Funnel Page Details',
            })
            router.refresh();
        })
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Edit Stage</CardTitle>
                <CardDescription>Edit the name and pathname of the stage.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Name"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pathName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pathname</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Pathname"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {formError && <FormError message={formError} />}
                        <Button type="submit"
                            disabled={false}
                            className="dark:text-white"
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
