import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/_components/ui/accordion'
import React from 'react'

export default function FAQ() {
    return (
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is a funnel builder?</AccordionTrigger>
                        <AccordionContent>
                            A funnel builder is a tool that helps you create a series of web pages designed to guide visitors towards a specific action, such as making a purchase or signing up for a newsletter.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Do I need coding skills to use Scaloor?</AccordionTrigger>
                        <AccordionContent>
                            No, Scaloor is a no-code platform. Our notion-like editor makes it easy for anyone to create professional funnels without any coding knowledge.
                        </AccordionContent>
                    </AccordionItem>
                    {/* <AccordionItem value="item-3">
                        <AccordionTrigger>Can I integrate Scaloor with my existing tools?</AccordionTrigger>
                        <AccordionContent>
                            Yes, Scaloor integrates with a wide range of popular marketing and analytics tools to help you streamline your workflow and maximize your funnel's performance.
                        </AccordionContent>
                    </AccordionItem> */}
                </Accordion>
            </div>
        </section>
    )
}