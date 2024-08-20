'use client';
import React from 'react'
import { Button } from '@/app/_components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/_components/ui/dialog';
import { Input } from '@/app/_components/ui/input';

type CreateStageDialogProps = {}

export default function CreateStageDialog({ }: CreateStageDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='dark:text-white'>
                    Add Stage
                </Button>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-4'>
                <DialogHeader>
                    <DialogTitle>
                        Create New Stage
                    </DialogTitle>
                    <DialogDescription>
                        Provide details for this stage.
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col gap-4'>
                    <Input
                        placeholder='Stage Name'
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}