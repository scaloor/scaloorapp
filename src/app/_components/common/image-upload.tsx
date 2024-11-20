'use client';
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Loading } from "./loading";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { Button } from "../ui/button";

type ImageUploadProps = {
    form?: UseFormReturn<any>
    value?: string
    className?: string
}

export default function ImageUpload({ form, value, className }: ImageUploadProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [previewURL, setPreviewURL] = useState<string | undefined>(undefined); // This is the URL of the uploaded image

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setIsLoading(true);
        form?.setValue(`${value}`, acceptedFiles[0]); // If there is a form, set the value of the form field to the uploaded file
        setPreviewURL(URL.createObjectURL(acceptedFiles[0])); // Set the image URL to the URL of the uploaded file
        setIsLoading(false);
    }, []);

    const removeImage = () => {
        setPreviewURL(undefined);
        setIsLoading(false);
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className={className}>
            <label {...getRootProps()}
                className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-background"
            >
                {!isLoading && !previewURL && ( // If the image is not loading and there is no image URL, render the dropzone
                    <div className=" text-center">
                        <div className="p-2 rounded-md max-w-min mx-auto text-gray-600">
                            <Upload size={20} />
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                            <span className="font-semibold">Click to upload or drag and drop</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            Click to upload files &#40;files should be under 10 MB &#41;
                        </p>
                    </div>
                )}
                {isLoading && ( // If the image is loading, render a loading spinner
                    <div>
                        <div className="flex justify-center items-center">
                            <Loading />
                        </div>
                    </div>
                )}
                {!isLoading && previewURL && ( // If the image is not loading and there is an image URL, render the image
                    <div>
                        <Image
                            width={1000}
                            height={1000}
                            src={previewURL}
                            className="w-full object-contain max-h-16 opacity-70"
                            alt="uploaded image"
                        />
                    </div>
                )}
            </label>
            <input {...getInputProps()}
                type='file'
                className='hidden'
            />
            {previewURL && ( // If there is an image URL, render a button to remove the image
                <Button
                    onClick={removeImage}
                    type="button"
                    variant="secondary"
                    className="float-right mt-2"
                >
                    Remove Image
                </Button>
            )}
        </div>
    )
};