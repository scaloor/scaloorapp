'use client'

import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/app/_components/ui/dialog'
import React from 'react'
import { PageTypes } from './editor-provider/defaults'
import { capitalizeFirstLetter } from '@/lib/utils'
import { PageType, useFunnelEditor } from './editor-provider'

type PageTypeDialogProps = {
    pageId: string
    pageType: string
}

export default function PageTypeDialog({ pageId, pageType }: PageTypeDialogProps) {
    const { dispatch } = useFunnelEditor()

    const handlePageTypeChange = (pageType: PageType) => {
        dispatch({ type: 'UPDATE_PAGE_TYPE', pageId, pageType })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Badge variant={'outline'} className="cursor-pointer">
                    <p className="text-muted-foreground text-sm">{capitalizeFirstLetter(pageType)}</p>
                </Badge>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Page Type
                </DialogHeader>
                <DialogDescription>
                    Choose a page type to implement scaloor&apos;s funnel logic. You can always customize the logic yourself.
                </DialogDescription>
                <div className='grid grid-cols-2 grid-rows-2 gap-4 h-48'>
                    {PageTypes.map((pageType, index) => (
                        <div key={index} className='flex items-center justify-center'>
                            <DialogClose asChild>
                                <Button variant='outline' className='w-full h-full' onClick={() => handlePageTypeChange(pageType.slug as PageType)}>
                                    {pageType.name}
                                </Button>
                            </DialogClose>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}