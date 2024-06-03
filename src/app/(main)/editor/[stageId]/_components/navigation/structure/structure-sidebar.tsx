import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/app/_components/ui/sheet';
import { Tabs, TabsContent } from '@/app/_components/ui/tabs';
import { cn } from '@/lib/utils';
import React from 'react'
import StructureTabs from './structure-tabs';
import { useEditor } from '../../providers/editor-provider';

type Props = {
    // This should have funnel ID to get the stages in the current funnel
}

export default function StructureSidebar({ }: Props) {
    const { state, dispatch } = useEditor();
    return (
        <>
            <Sheet
                open={true}
                modal={false}
            >
                <Tabs
                    className="w-full "
                    defaultValue="Stages"
                >
                    <SheetContent
                        showX={false}
                        side="left"
                        className={cn(
                            'mt-[50px] w-[50px] z-[80] shadow-none  p-0 focus:border-none transition-all overflow-hidden',
                            { hidden: state.editor.previewMode }
                        )}
                    >
                        <StructureTabs />
                    </SheetContent>
                    <SheetContent
                        showX={false}
                        side="left"
                        className={cn(
                            'mt-[50px] w-60 z-[40] shadow-none p-0 ml-[50px] bg-background h-full transition-all overflow-hidden max-w-',
                            { hidden: state.editor.previewMode }
                        )}
                    >
                        <div className="grid gap-2 h-full pb-36 overflow-scroll no-scrollbar">
                            <TabsContent value="Stages">
                                <SheetHeader className="text-left p-6">
                                    <SheetTitle>Stages</SheetTitle>
                                    <SheetDescription>
                                        The other stages that currently exist in your funnel.
                                    </SheetDescription>
                                </SheetHeader>
                            </TabsContent>
                            <TabsContent value="Templates">
                                <SheetHeader className="text-left p-6 ">
                                    <SheetTitle>Templates</SheetTitle>
                                    <SheetDescription>
                                        Prebuilt, high-converting funnel templates.
                                    </SheetDescription>
                                </SheetHeader>
                                {/* <ComponentsTab /> */}
                            </TabsContent>
                        </div>
                    </SheetContent>
                </Tabs>
            </Sheet></>
    );
}