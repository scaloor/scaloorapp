'use client'


import { AspectRatio } from '@/app/_components/ui/aspect-ratio';
import { Button } from '@/app/_components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/app/_components/ui/command';
import { Separator } from '@/app/_components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/app/_components/ui/sheet';
import { cn } from '@/lib/utils';
import { Business } from '@/server/db/types';
import { Compass, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'

type Props = {
  defaultOpen?: boolean
  business: Business
}

const businessMenuOptions = [
  {
    name: 'Dashboard',
    link: '/account'
  },
  {
    name: 'Funnels',
    link: '/account/funnel'
  },
  {
    name: 'Settings',
    link: '/account/settings'
  },

]
export function BusinessSidebarOptions({ defaultOpen, business }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  )

  useEffect(() => {
    setIsMounted(true);
  }, [])


  if (!isMounted) return

  let sidebarLogo = business?.businessLogo || "/assets/scaloor_cropped.jpg";


  return (
    <Sheet
      modal={false}
      {...openState}>
      <SheetTrigger
        asChild
        className='absolute left-4 top-4 z-[100] md:!hidden flex'>
        <Button
          variant={'outline'}
          size={'icon'}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={!defaultOpen}
        side={'left'}
        className={cn(
          'bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6',
          {
            'hidden md:inline-block z-0 w-[300px]': defaultOpen,
            'inline-block md:hidden z-[100] w-full': !defaultOpen,
          }
        )}>
        <div>
          <AspectRatio ratio={16 / 5}>
            <Image
              src={sidebarLogo}
              alt={'Sidebar Logo'}
              fill
              className='rounded-md object-contain' />
          </AspectRatio>
          <div className='w-full my-4 flex items-center text-left gap-2'>
            <Compass />
            <div className='flex flex-col'>
              {business.name}
              <span className='text-muted-foreground'>
                {business.address}
              </span>
            </div>
          </div>
          <p className='text-muted-foreground text-xs mb-2'>
            Account Options
          </p>
          <Separator className='mb-4' />
          <nav className='relative'>
            <Command className='rounded-lg overflow-visible bg-transparent'>
              <CommandInput placeholder='Search...' />
              <CommandList className='py-4 overflow-visible'>
                <CommandEmpty>No Results Found</CommandEmpty>
                <CommandGroup className='overflow-visible'>
                  {businessMenuOptions.map((menuOption, index) => {
                    return (
                      <CommandItem
                        key={index}
                        className='md:w-[320px] w-full'>
                        <Link
                          href={menuOption.link}
                          className='flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]'>
                          <span>{menuOption.name}</span>
                        </Link>
                      </CommandItem>
                    )
                  })}

                </CommandGroup>
              </CommandList>
            </Command>
          </nav>


        </div>
      </SheetContent>
    </Sheet>

  )
}