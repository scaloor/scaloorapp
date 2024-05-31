'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aDFucFbMyb8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/app/_components/ui/input"
import { CardContent, CardFooter, Card, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"
import { useCallback, useState } from "react"
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';


const ImageUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const uploadedFile = acceptedFiles[0]
        console.log('Accepted files:', uploadedFile)
        setFile(uploadedFile)
        console.log('Uploaded file:', file)

        if (!!fileUrl) {
            URL.revokeObjectURL(fileUrl)
        }

        if (!!file) {
            const url = URL.createObjectURL(file)
            setFileUrl(url)
        } else {
            setFileUrl(undefined)
        }

    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <>
            <Card {...getRootProps()}>
                <CardContent className="p-6 space-y-4">
                    <CardHeader>
                        <CardTitle>Image Upload</CardTitle>
                    </CardHeader>
                    {!fileUrl && (
                        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
                            <FileIcon />
                            <span className="text-sm font-medium text-gray-500">Drag and drop a file or click to browse</span>
                            <span className="text-xs text-gray-500">PDF, image, video, or audio</span>
                            <Input
                                {...getInputProps()}
                                id="dropzone-file"
                                accept="image/png, image/jpeg"
                                type="file"
                            />
                        </div>
                    )}
                    {!!fileUrl && (
                        <div>
                            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
                                Selected Files
                            </p>
                            <div className="space-y-2 pr-3">
                                <div
                                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all">
                                    <div className="flex items-center flex-1 p-2">
                                        <div className="w-full ml-2 space-y-1">
                                            <div className="text-sm flex justify-between">
                                                <p className="text-muted-foreground ">
                                                    {file?.name.slice(0, 25)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setFile(null)
                                            console.log('Should be null:', file)
                                            setFileUrl(undefined)
                                            console.log('Should be null:', fileUrl)
                                        }}
                                        className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button size="lg">Upload</Button>
                </CardFooter>
            </Card >



        </>
    )
}

function FileIcon() {
    return (
        <svg
            className="w-12 h-12"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
    )
}

export default ImageUploader;