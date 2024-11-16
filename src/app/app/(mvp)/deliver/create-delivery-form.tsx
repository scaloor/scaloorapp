"use client"

import { Camera, MonitorPlay, Upload, Youtube } from 'lucide-react'
import { useState } from "react"

import { Button } from "@/app/_components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group"
import { Switch } from "@/app/_components/ui/switch"
import ImageUpload from '@/app/_components/common/image-upload'

export default function CreateDeliveryForm() {
    const [lessonType, setLessonType] = useState("video")
    const [useSamePhoto, setUseSamePhoto] = useState(true)

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Lesson</CardTitle>
                <CardDescription>
                    Quickly create your lesson, add content and upload your media.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Input
                        placeholder="Lesson title"
                        className="text-xl font-medium h-12"
                    />
                    <Button variant="ghost" className="h-auto p-0 text-muted-foreground">
                        + Add description
                    </Button>
                </div>

                <div className="space-y-3">
                    <Label>Lesson category</Label>
                    <RadioGroup
                        defaultValue="video"
                        onValueChange={setLessonType}
                        className="grid grid-cols-3 gap-4"
                    >
                        <Label
                            htmlFor="video"
                            className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer ${lessonType === "video" ? "border-primary" : "border-muted"
                                }`}
                        >
                            <RadioGroupItem value="video" id="video" className="sr-only" />
                            <MonitorPlay className="mb-2 h-6 w-6" />
                            Video
                        </Label>
                        <Label
                            htmlFor="youtube"
                            className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer ${lessonType === "youtube" ? "border-primary" : "border-muted"
                                }`}
                        >
                            <RadioGroupItem value="youtube" id="youtube" className="sr-only" />
                            <Youtube className="mb-2 h-6 w-6" />
                            YouTube
                        </Label>
                        <Label
                            htmlFor="immersive"
                            className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer ${lessonType === "immersive" ? "border-primary" : "border-muted"
                                }`}
                        >
                            <RadioGroupItem value="immersive" id="immersive" className="sr-only" />
                            <Camera className="mb-2 h-6 w-6" />
                            Immersive
                        </Label>
                    </RadioGroup>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Thumbnail image</Label>
                        <p className="text-sm text-muted-foreground">
                            Use the same as main course photo
                        </p>
                    </div>
                    <Switch
                        checked={useSamePhoto}
                        onCheckedChange={setUseSamePhoto}
                    />
                </div>

                <div className="space-y-3">
                    <Label>Video file</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <div className="mx-auto w-fit mb-4">
                            <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium mb-1">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Format MP4 • Max file size 150MB
                        </p>
                    </div>
                </div>
                <div className="space-y-3">
                    <ImageUpload />
                </div>
                <div className="flex items-center justify-between pt-4">
                    <Button className="bg-primary text-primary-foreground">
                        Continue
                        <span className="ml-2 text-sm text-primary-foreground/70">
                            press Enter↵
                        </span>
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Step 1/4</span>
                        <span>25%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}