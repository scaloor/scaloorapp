'use client';
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Loading } from "./loading";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { Button } from "../ui/button";

type FileUploadProps = {
    form?: UseFormReturn<any>
    value?: string
    className?: string
    accept?: "DOCUMENT" | "IMAGE"
    initialURL?: string
}

export default function FileUpload({ form, value, className, accept = "IMAGE", initialURL }: FileUploadProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [previewURL, setPreviewURL] = useState<string | undefined>(
        initialURL
            ? accept === "IMAGE"
                ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/scaloor-bucket/${initialURL}`
                : initialURL
            : undefined
    );

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setIsLoading(true);
        form?.setValue(`${value}`, acceptedFiles[0]); // If there is a form, set the value of the form field to the uploaded file
        if (accept === "IMAGE") {
            setPreviewURL(URL.createObjectURL(acceptedFiles[0])); // Set the image URL to the URL of the uploaded file
        } else {
            setPreviewURL(acceptedFiles[0].name); // Set the image URL to the URL of the uploaded file
        }
        setIsLoading(false);
    }, []);

    const removeImage = () => {
        setPreviewURL(undefined);
        setIsLoading(false);
    }

    console.log("previewURL", previewURL);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className={className}>
            {!previewURL && (
                <>
                    <label
                        className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-background"
                        {...getRootProps()}
                    >
                        {!isLoading && (
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
                        {isLoading && (
                            <div>
                                <div className="flex justify-center items-center">
                                    <Loading />
                                </div>
                            </div>
                        )}
                    </label>
                    <input {...getInputProps()}
                        type={`${accept ? accept : "file"}`}
                        className='hidden'
                    />
                </>
            )}
            {!isLoading && previewURL && accept === "IMAGE" && ( // If the image is not loading and there is an image URL, render the image
                <div className="w-full flex flex-col gap-4">
                    <Image
                        width={1000}
                        height={1000}
                        src={previewURL}
                        className="w-full h-auto object-contain"
                        alt="uploaded image"
                    />
                    <div className="flex justify-end">
                        <Button
                            onClick={removeImage}
                            type="button"
                            variant="secondary"
                        >
                            Remove Image
                        </Button>
                    </div>
                </div>
            )}
            {!isLoading && previewURL && accept === "DOCUMENT" && ( // If the image is not loading and there is an image URL, render the image
                <div className="w-full">
                    <div className="bg-muted w-full p-2 rounded-md mb-2">
                        <p className="text-sm text-muted-foreground">{previewURL}</p>
                    </div>
                    <Button
                        onClick={removeImage}
                        type="button"
                        variant="secondary"
                    >
                        Remove File
                    </Button>
                </div>
            )}
        </div>
    )
};