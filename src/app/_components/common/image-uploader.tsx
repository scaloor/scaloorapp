'use client'
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Loading } from "./loading"
import { Button } from "../ui/button"
import { Upload } from "lucide-react"
import Image from "next/image"

/**
 * This component is used specifically to upload images.
 * The logic for image upload, validation and onFileChange is handled in the parent component.
 * This component exclusively handles the UI of image input and preview.
 */


type ImageUploaderProps = {
    className?: string
    value: string | null
    onImageChange: (file: File | undefined) => void
}

export default function ImageUploader({ className, value, onImageChange }: ImageUploaderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [previewURL, setPreviewURL] = useState<string | undefined>(value ? value : undefined);


    
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setIsLoading(true);
        onImageChange(acceptedFiles[0]);
        setPreviewURL(URL.createObjectURL(acceptedFiles[0]));
        setIsLoading(false);
    }, [onImageChange])

    const removeImage = () => {
        setPreviewURL(undefined);
        setIsLoading(false);
        onImageChange(undefined);
    }

    const { getRootProps, getInputProps } = useDropzone({ 
        onDrop,
        maxFiles: 1,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
        }
    });

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
                        type="file"
                        className='hidden'
                    />
                </>
            )}
            {!isLoading && previewURL && ( // If the image is not loading and there is an image URL, render the image
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
        </div>
    )
}
