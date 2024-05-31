'use client'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/app/_components/ui/sheet';
import { Tabs, TabsContent } from '@/app/_components/ui/tabs';
import { cn } from '@/lib/utils';
// SideToolbar.tsx
import React from 'react';
import StylesTabs from './styles-tabs';
import { useEditor } from '../../providers/editor-provider';

interface SideToolbarProps {
    tools: Array<JSX.Element>;
    visible: boolean;
}

const StylesSidebar: React.FC<SideToolbarProps> = ({ tools, visible }) => {
    const { state, dispatch } = useEditor();
    /* console.log(visible) */
    return (
        <>
            <Sheet
                open={true}
                modal={false}
            >
                <Tabs
                    className="w-full "
                    defaultValue="Settings"
                >
                    <SheetContent
                        showX={false}
                        side="right"
                        className={cn(
                            'mt-[50px] w-[50px] z-[80] shadow-none  p-0 focus:border-none transition-all overflow-hidden',
                            { hidden: state.editor.previewMode }
                        )}
                    >
                        <StylesTabs />
                    </SheetContent>
                    <SheetContent
                        showX={false}
                        side="right"
                        className={cn(
                            'mt-[50px] w-72 z-[40] shadow-none p-0 mr-[50px] bg-background h-full transition-all overflow-hidden ',
                            { hidden: state.editor.previewMode }
                        )}
                    >
                        <div className="grid gap-4 h-full pb-36 overflow-scroll no-scrollbar">
                            <TabsContent value="Settings">
                                <SheetHeader className="text-left p-6">
                                    <SheetTitle>Styles</SheetTitle>
                                    <SheetDescription>
                                        Show your creativity! You can customize every component as you
                                        like.
                                    </SheetDescription>
                                </SheetHeader>

                                <div className={`bg-black ${visible ? 'block' : 'hidden'}`}>
                                    {tools.map((tool, index) => (
                                        <div key={index} className="m-2">
                                            {tool}
                                        </div>
                                    ))}
                                </div>

                            </TabsContent>
                            <TabsContent value="Components">
                                <SheetHeader className="text-left p-6 ">
                                    <SheetTitle>Components</SheetTitle>
                                    <SheetDescription>
                                        You can drag and drop components on the canvas
                                    </SheetDescription>
                                </SheetHeader>
                                {/* <ComponentsTab /> */}
                            </TabsContent>
                        </div>
                    </SheetContent>
                </Tabs>
            </Sheet>
        </>
    );
};

export default StylesSidebar;
