import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper'
import Safari from '@/app/_components/magicui/safari'
import { Button } from '@/app/_components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'



export default function Hero() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Build High-Converting Funnels with Ease
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            Scaloor is the no-code funnel builder that helps you create, optimize, and scale your marketing funnels in minutes.
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Button>
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="relative mt-12">
                <Safari
                    url="app.scaloor.com"
                    className="size-full"
                    src="/assets/scaloor-demo1.png"
                />
            </div>
        </section>
    )
}