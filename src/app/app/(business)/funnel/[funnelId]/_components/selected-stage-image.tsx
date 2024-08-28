import Link from "next/link";
import Image from "next/image";
import Placeholder from "./placeholder";
import { LucideEdit, ExternalLink } from "lucide-react";

type SelectedStageDetailsProps = {
    id: string;
    name: string;
    previewImage?: string;
}

export default function SelectedStageImage({ id, name, previewImage }: SelectedStageDetailsProps) {

    return (
        <div className="border-2 rounded-lg sm:w-80 w-full  overflow-clip">
            <Link
                href={`/editor/${id}`}
                className="relative group"
            >
                <div className="cursor-pointer group-hover:opacity-30 w-full">
                    {previewImage ? (
                        <Image src={previewImage} alt={name} width={100} height={100} />
                    ) : (
                        <Placeholder />
                    )}
                </div>
                <LucideEdit
                    size={50}
                    className="!text-muted-foreground absolute top-1/2 left-1/2 opacity-0 transofrm -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-100"
                />
            </Link>
            <Link
                target="_blank"
                href={`preview link`}
                className="group flex items-center justify-start p-2 gap-2 hover:text-primary transition-colors duration-200"
            >
                <ExternalLink size={15} />
                <div className="w-64 overflow-hidden overflow-ellipsis ">
                    Preview link
                </div>
            </Link>
        </div>
    )
}

