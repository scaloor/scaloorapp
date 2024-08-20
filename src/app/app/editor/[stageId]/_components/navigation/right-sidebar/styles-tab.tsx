'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/_components/ui/accordion';
import React from 'react'
import { ColorDropdownMenu } from '@/app/_components/plate-ui/color-dropdown-menu';
import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font';
import { Icons } from '@/app/_components/plate-ui/icons';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/app/_components/plate-ui/tooltip';
import { AlignDropdownMenu } from '@/app/_components/plate-ui/align-dropdown-menu';
import TypographyAccordion from './typography-accordion';
import FontAccordion from './font-accordion';

const FontStyleOptions = [
    { name: 'H1', size: 12 },
    { name: 'H2', size: 10 },
    { name: 'H3', size: 8 },
    { name: 'H4', size: 6 },
]

export default function StylesTab() {
    return (
        <div className='p-2'>
            <p className='text-lg font-semibold'>Styles</p>
            <p className='text-muted-foreground text-sm'>Personalise your style.</p>
            <Accordion type='multiple' defaultValue={['Background', 'Font', 'Typography']}>
                <AccordionItem value='Background'>
                    <AccordionTrigger className='!no-underline text-sm font-semibold'>Background</AccordionTrigger>
                    <AccordionContent >
                        <TooltipProvider>
                            <div>Background color etc.</div>
                        </TooltipProvider>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='Font'>
                    <AccordionTrigger className='!no-underline text-sm font-semibold'>Font</AccordionTrigger>
                    <AccordionContent >
                        <TooltipProvider>
                            <FontAccordion />
                        </TooltipProvider>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='Typography'>
                    <AccordionTrigger className='!no-underline text-sm font-semibold'>Typography</AccordionTrigger>
                    <AccordionContent>
                        {FontStyleOptions.map((fontStyle, index) => (
                            <div key={index}>
                                <TypographyAccordion fontStyle={fontStyle.name} fontSize={fontStyle.size} />
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}