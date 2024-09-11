'use client'
import React, { useState, useCallback } from 'react'
import { InsertPage, SelectPage } from '@/server/db/schema'
import Novel from './novel'
import { Separator } from '@/app/_components/ui/separator'
import { defaultContent } from './novel/default-content'
import { scaloorId } from '@/server/db/schema/defaults'
import { addNewPageAction } from '@/server/actions/api/editor'


type PageEditorProps = {
    initialPages: SelectPage[]
    funnelId: string
}

export default function PageEditor({ initialPages, funnelId }: PageEditorProps) {
    const [pages, setPages] = useState<SelectPage[]>(initialPages)
    const initialContent = pages?.[0]?.content || defaultContent

    const addNewPage = useCallback(async () => {
        const newPage: SelectPage = {
            id: scaloorId('page'),
            name: 'New Page',
            pathName: 'new-page',
            funnelId,
            order: pages.length + 1,
            type: 'thank_you',
            content: defaultContent,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // Add other necessary fields
        }
        setPages(prevPages => [...prevPages, newPage])
        console.log('newPage', newPage)

        // Asynchronously update the database
        /* const { error } = */ await addNewPageAction(newPage)
        // if error, remove the page from local state
        /* if (error) {
            setPages(prevPages => prevPages.filter(page => page.id !== newPage.id))
            toast(error)
        } */
    }, [])


    if (pages.length === 0) {
        return (
            <Novel
                initialContent={initialContent}
            />
        )
    }
    return (
        <>
            {pages.map((page, index) => (
                <>
                    {index > 0 && <Separator className="my-4" />}
                    <Novel
                        initialContent={page.content || defaultContent}
                    />
                </>
            ))}
        </>
    )
}