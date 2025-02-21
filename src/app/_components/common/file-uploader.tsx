'use client'
import { Upload } from "lucide-react";
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone";
import { Loading } from "./loading";
import { Button } from "../ui/button";

/**
 * This component is used specifically to upload files, images are handled separately.
 * The logic for the file upload, validation, and onFileChange is handled in the parent component.
 * This component exclusively handles the UI of file input and preview.
 */

type FileUploaderProps = {
    className?: string
    value: string | null
    onFileChange: (file: File | undefined) => void
}

export default function FileUploader({ className, value, onFileChange }: FileUploaderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [previewURL, setPreviewURL] = useState<string | undefined>(value ? value : undefined);
    
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setIsLoading(true);
        onFileChange(acceptedFiles[0]);
        setPreviewURL(acceptedFiles[0].name);
        setIsLoading(false);
    }, [onFileChange])

    const removeFile = () => {
        setPreviewURL(undefined);
        setIsLoading(false);
        onFileChange(undefined);
    }

    const { getRootProps, getInputProps } = useDropzone({ 
        onDrop,
        maxFiles: 1
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
                            <div className="text-center">
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
            {!isLoading && previewURL && (
                <div className="w-full">
                    <div className="bg-muted w-full p-2 rounded-md mb-2">
                        <p className="text-sm text-muted-foreground">{previewURL}</p>
                    </div>
                    <Button
                        onClick={removeFile}
                        type="button"
                        variant="secondary"
                    >
                        Remove File
                    </Button>
                </div>
            )}
        </div>
    )
}


