'use client'
import React, { useState, useCallback, FocusEventHandler } from 'react'
import { SelectPage } from '@/server/db/schema'
import Tiptap from './tiptap'
import { Separator } from '@/app/_components/ui/separator'
import { defaultContent } from './tiptap/default-content'
import { scaloorId } from '@/server/db/schema/defaults'
import { deletePageAction } from '@/server/actions/protected/editor'
import { useFunnelEditor } from './editor-provider'
import { Input } from '@/app/_components/ui/input'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip'
import { Button } from '@/app/_components/ui/button'
import { defaultThankYouPage, PageTypes } from './editor-provider/defaults'
import { TrashIcon } from 'lucide-react'
import PageTypeDialog from './page-type-dialog'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/app/_components/ui/dialog'




export default function PageEditor() {
    const { state, dispatch } = useFunnelEditor()
    const [isHovered, setIsHovered] = useState(false)
    const { pages } = state
    //console.log('pages', state.pages)

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

    const deletePage = async (pageId: string) => {
        const { error } = await deletePageAction(pageId)
        if (error) {
            toast.error(error)
        }
        dispatch({ type: 'REMOVE_PAGE', pageId })
        toast.success('Page deleted')
    }


    return (
        <>
            {pages.map((page, index) => (
                <div key={page.id}>
                    <div className="grid grid-cols-3 my-2 w-full text-center"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div></div>
                        <div className="flex flex-col items-center justify-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Input
                                            defaultValue={page.name}
                                            className="border-none h-8 m-0 p-0 text-md text-muted-foreground hover:bg-zinc-200 cursor-pointer text-center w-auto focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-zinc-200 rounded-3xl my-2"
                                            data-page-id={page.id}
                                            onBlur={handleOnBlurNameChange}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Page name</p>
                                        <p className="text-muted-foreground text-xs">This is what will appear in the URL</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {/**To change page type can use select or potentially dialog? */}
                                        <PageTypeDialog pageId={page.id} pageType={PageTypes.find(p => p.slug === page.type)!.name} />
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Page type</p>
                                        <p className="text-muted-foreground text-xs">This won&apos;t be visible to your customers</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div>
                            {page.order !== 1 && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant='ghost'
                                            className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                                            size='sm'
                                        >
                                            <TrashIcon className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete Page?</DialogTitle>
                                        </DialogHeader>
                                        <DialogDescription>
                                            This action cannot be undone.
                                        </DialogDescription>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="button" variant='destructive' onClick={() => deletePage(page.id)}>Delete</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>
                    <Separator />
                    <Tiptap
                        initialContent={page.content || defaultContent}
                        pageId={page.id}
                    />
                </div>
            ))}
        </>
    )
}