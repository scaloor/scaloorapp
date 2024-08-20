'use client';
import React from 'react'
import { TabsList, TabsTrigger } from '@/app/_components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip'
import { LayersIcon, TableIcon } from '@radix-ui/react-icons'

type Props = {}

export default function LeftTabList({ }: Props) {
  return (
    <TooltipProvider>
      <TabsList className="flex items-center flex-col justify-evenly w-full bg-transparent h-fit gap-4 ">
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger value="Stages" className="w-10 h-10 p-0 data-[state=active]:bg-muted">
              <LayersIcon />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Stages</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger value="Templates" className="w-10 h-10 p-0 data-[state=active]:bg-muted">
              <TableIcon />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Templates</p>
          </TooltipContent>
        </Tooltip>
      </TabsList>
    </TooltipProvider>
  )
}