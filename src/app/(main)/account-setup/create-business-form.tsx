'use client';

import ExampleUpload from "@/app/_components/common/example-upload";
import ImageUpload from "@/app/_components/common/image-upload";

export default function CreateBusinessForm() {
    return (
        <div className="flex justify-center flex-col">
            <div>
                <h1 className="text-center">Add Business details</h1>
            </div>
            <div className="flex justify-center mt-5">
                <ImageUpload />
            </div>
            <div className="flex justify-center mt-5">
                <ExampleUpload />
            </div>
        </div>
    )
}