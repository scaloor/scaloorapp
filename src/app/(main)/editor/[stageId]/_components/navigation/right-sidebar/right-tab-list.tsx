'use client';
import React from 'react'
import { TabsList, TabsTrigger } from '@/app/_components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip'
import { ImageIcon, Pencil2Icon } from '@radix-ui/react-icons'

type Props = {}

export default function RightTabList({ }: Props) {
  return (
    <TooltipProvider>
      <TabsList className="flex items-center flex-col justify-evenly w-full bg-transparent h-fit gap-4 ">
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger value="Styles" className="w-10 h-10 p-0 data-[state=active]:bg-muted">
              <Pencil2Icon />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Styles</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger value="Media" className="w-10 h-10 p-0 data-[state=active]:bg-muted">
              <ImageIcon />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Media</p>
          </TooltipContent>
        </Tooltip>
      </TabsList>
    </TooltipProvider>
  )
}