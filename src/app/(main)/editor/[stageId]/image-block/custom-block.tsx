'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/app/_components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel } from '@/app/_components/ui/form';
import { ImageBlockData } from './tool';

interface ImageBlockProps {
    data: string;
    onChange: (data: ImageBlockData) => void;
}

const formSchema = z.object({
    image: z.instanceof(File),
});

type FormValue = z.infer<typeof formSchema>

const CustomBlock: React.FC<ImageBlockProps> = ({ data, onChange }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const form = useForm<FormValue>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = () => {

        console.log('slay')

    }

    /* useEffect(() => {
        setValue(initialValue);
    }, [initialValue]); */

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!!previewUrl) {
            // revoke url logic
            URL.revokeObjectURL(previewUrl)
        }

        if (!!file) {
            form.setValue(`image`, file)
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        } else {
            setPreviewUrl(null)
        }
    }

    useEffect(() => {
        if (!!previewUrl) {
            onChange({ image: previewUrl });
        }

        console.log('Preview URL:', previewUrl);
    }, [previewUrl, onChange]);


    return (
        <div className="">
            {!previewUrl && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className='w-full flex flex-col space-y-8'
                    >
                        <FormField
                            control={form.control}
                            name='image'
                            render={() => (
                                <FormItem>
                                    <FormLabel htmlFor="picture">Image</FormLabel>
                                    <Input id="image" type="file" accept='image/jpeg,image/png' onChange={handleImageChange} multiple />
                                </FormItem>
                            )}

                        />
                    </form>
                </Form>
            )}
            {!!previewUrl && (
                <Image
                    src={previewUrl}
                    alt='Block Image'
                    height={100}
                    width={100} />
            )}
        </div>
    );
};

export default CustomBlock;