'use client'
import React, { useState, useCallback, FocusEventHandler } from 'react'
import { InsertPage, SelectPage } from '@/server/db/schema'
import Tiptap from './tiptap'
import { Separator } from '@/app/_components/ui/separator'
import { defaultContent } from './tiptap/default-content'
import { scaloorId } from '@/server/db/schema/defaults'
import { addNewPageAction } from '@/server/actions/api/editor'
import { useFunnelEditor } from './editor-provider'
import { Input } from '@/app/_components/ui/input'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/_components/ui/select'
import { capitalizeFirstLetter } from '@/lib/utils'
import { Button } from '@/app/_components/ui/button'
import { defaultThankYouPage, PageTypes } from './editor-provider/defaults'
import { Badge } from '@/app/_components/ui/badge'




export default function PageEditor() {
    const { state, dispatch } = useFunnelEditor()
    const { pages } = state
    console.log('pages', state.pages)

    const addNewPage = useCallback(async () => {
        const newPage: SelectPage = {
            id: scaloorId('page'),
            name: 'New Page',
            pathName: 'new-page',
            funnelId: state.funnelId,
            order: pages.length + 1,
            type: 'thank_you',
            content: defaultContent,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // Add other necessary fields
        }
        /* setPages(prevPages => [...prevPages, newPage])
        console.log('newPage', newPage) */

        // Asynchronously update the database
        /* const { error } = */ await addNewPageAction(newPage)
        // if error, remove the page from local state
        /* if (error) {
            setPages(prevPages => prevPages.filter(page => page.id !== newPage.id))
            toast(error)
        } */
    }, [])

    const handleOnBlurNameChange: FocusEventHandler<HTMLInputElement> = async (event) => {
        const newName = event.target.value
        const pageId = event.target.dataset.pageId // Add this attribute to the Input component
        const currentPage = pages.find(p => p.id === pageId)

        if (!currentPage || newName === currentPage.name) return
        try {
            // Dispatch an action to update the page name
            toast(`Updated page name: ${event.target.value}`)
        } catch (error) {
            toast.warning('Error updating page name')
        }
    }

    const handleAddNewPage = () => {
        dispatch({ type: 'ADD_PAGE', page: defaultThankYouPage(state.funnelId, state.pages.length + 1) })
    }


    return (
        <>
            <Button onClick={handleAddNewPage}>Add New Page</Button>
            {pages.map((page, index) => (
                <div key={index}>
                    <div className="flex flex-col justify-center items-center my-2 w-full text-center">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Input
                                        defaultValue={page.name}
                                        className="border-none h-8 m-0 p-0 text-md text-muted-foreground hover:bg-zinc-200 cursor-pointer text-center w-auto focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-zinc-200"
                                        data-page-id={page.id}
                                        onBlur={handleOnBlurNameChange}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Page name</p>
                                    <p className="text-muted-foreground text-xs">This won&apos;t be visible to your customers</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    {/*  <Select>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={page.type} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="checkout">Checkout</SelectItem>
                                            <SelectItem value="upsell">Upsell</SelectItem>
                                            <SelectItem value="thank_you">Thank you</SelectItem>
                                        </SelectContent>
                                    </Select> */}
                                    <Badge variant={'outline'} className="cursor-default">
                                        <p className="text-muted-foreground text-sm">{PageTypes.find(type => type.slug === page.type)?.name}</p>
                                    </Badge>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Page type</p>
                                    <p className="text-muted-foreground text-xs">This won&apos;t be visible to your customers</p>
                                </TooltipContent>
                            </Tooltip>

                        </TooltipProvider>
                    </div>
                    <Tiptap
                        initialContent={page.content || defaultContent}
                    />
                </div>
            ))}
        </>
    )
}