import React from 'react'
import { TabsList, TabsTrigger } from '@/app/_components/ui/tabs'
import { Plus, SettingsIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip'

type Props = {}

const StylesTabs = (props: Props) => {
    return (
        <TooltipProvider>
            <TabsList className=" flex items-center flex-col justify-evenly w-full bg-transparent h-fit gap-4 ">
                <Tooltip>
                    <TooltipTrigger>
                        <TabsTrigger
                            value="Settings"
                            className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                        >
                            <SettingsIcon />
                        </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Styles</p>
                    </TooltipContent>
                </Tooltip>
                <TabsTrigger
                    value="Components"
                    className="data-[state=active]:bg-muted w-10 h-10 p-0"
                >
                    <Plus />
                </TabsTrigger>
            </TabsList>
        </TooltipProvider>
    )
}

export default StylesTabs