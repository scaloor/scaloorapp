

import { AlignDropdownMenu } from '@/app/_components/plate-ui/align-dropdown-menu'
import { ColorDropdownMenu } from '@/app/_components/plate-ui/color-dropdown-menu'
import { Icons } from '@/app/_components/plate-ui/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/_components/plate-ui/tooltip'
import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font'
import React from 'react'

export default function FontAccordion() {
    return (
        <div className='grid grid-cols-3 gap-2'>
            <div className=''>
                <Tooltip>
                    <TooltipTrigger>
                        <ColorDropdownMenu nodeType={MARK_COLOR} tooltip='Font Color'>
                            <Icons.color />
                        </ColorDropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Font Color</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <div>
                <Tooltip>
                    <TooltipTrigger>
                        <ColorDropdownMenu
                            nodeType={MARK_BG_COLOR}
                            tooltip="Highlight Color"
                        >
                            <Icons.bg />
                        </ColorDropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Highlight Color</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <div>
                <Tooltip>
                    <TooltipTrigger>
                        <AlignDropdownMenu />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Alignment</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
}