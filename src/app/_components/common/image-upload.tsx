/* 'use client';

import { handleImageUpload } from "@/server/storage";
import { UploadCloud } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";


export default function ImageUpload() {
    const [imageToUpload, setImageToUpload] = useState<File | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setLoading(true);
        await handleImageUpload(acceptedFiles[0]);
    }, []); 

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="w-[300px]">
            <div>
                <label {...getRootProps()}
                    className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                >
                    <div className=" text-center">
                        <div className="p-2 rounded-md max-w-min mx-auto text-gray-600">
                            <UploadCloud size={20} />
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                            <span className="font-semibold">Drag files</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            Click to upload files &#40;files should be under 10 MB &#41;
                        </p>
                    </div>
                </label>
            </div>
        </div>
    )
} */