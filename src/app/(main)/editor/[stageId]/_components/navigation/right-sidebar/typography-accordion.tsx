import { Input } from '@/app/_components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip';
import { Button } from '@/app/_components/ui/button';
import React, { FocusEventHandler, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/_components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { FONT_SIZES } from '../../constants';
import { TriangleDownIcon } from '@radix-ui/react-icons';

type TypographyInputProps = {
    // Text type/style
    fontStyle: string;
    fontSize: number;
}



export default function TypographyAccordion({ fontStyle, fontSize }: TypographyInputProps) {
    const [fontSizeIndex, setFontSizeIndex] = useState(fontSize);

    let fontSizeString = FONT_SIZES[fontSizeIndex];

    const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (
        event
    ) => {
        // Add regex validation for number input
        if (event.target.value === fontSizeString) return // If the value is the same as the original size, do nothing
        if (event.target.value) {                        // If the value is not empty, update the size
            /* const newStageDetails = { // Update the state
                ...stageDetails,
                name: event.target.value,
            } */
            /* await updateStage(newStageDetails) */ // Update DB? or does this happen with autosave?
            fontSizeString = event.target.value
            console.log('fontSize:', fontSizeString)

        } else {
            event.target.value = fontSizeString // If empty, set the value to the original size
        }
    }

    const decrementFontSize = () => {
        if (fontSizeIndex > 0) {
            setFontSizeIndex(fontSizeIndex - 1);
            fontSizeString = FONT_SIZES[fontSizeIndex];
        }
    }

    const incrementFontSize = () => {
        if (fontSizeIndex < FONT_SIZES.length - 1) {
            setFontSizeIndex(fontSizeIndex + 1);
            fontSizeString = FONT_SIZES[fontSizeIndex];
        }
    }

    return (
        <TooltipProvider>
            <div className='flex justify-between my-2 items-center'>
                <p className=''>{fontStyle}</p>
                <div className=''>
                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger>
                                <DropdownMenuTrigger>
                                    <Button variant='outline' size='sm' className='h-8 px-2'>
                                        <p className='mr-2'>Inter</p>
                                        <TriangleDownIcon className='' />
                                    </Button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Font</p>
                            </TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Inter</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className=''>
                    <Button variant='ghost' size='sm' className='h-8 px-2' onClick={decrementFontSize}>
                        -
                    </Button>
                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger>
                                <DropdownMenuTrigger>
                                    <Input
                                        value={fontSizeString}
                                        className="border-slate-500 border-2 bg-white text-black h-5 m-0 p-0 w-7 text-center"
                                        onBlur={handleOnBlurTitleChange}
                                    />
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Font Size</p>
                            </TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent>
                            {FONT_SIZES.map((size, index) => (
                                <DropdownMenuItem key={index} onSelect={() => setFontSizeIndex(index)}>{size}</DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant='ghost' size='sm' className='h-8 px-2' onClick={incrementFontSize}>
                        +
                    </Button>
                </div>
            </div>
        </TooltipProvider >
    )
}