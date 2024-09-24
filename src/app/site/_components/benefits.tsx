import { CheckCircle, Layers, Zap } from 'lucide-react'
import React from 'react'


export default function Benefits() {
    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose Scaloor?</h2>
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <Zap className="h-12 w-12 text-primary" />
                        <h3 className="text-xl font-bold">Lightning Fast</h3>
                        <p className="text-gray-500 dark:text-gray-400">Create professional funnels in minutes, not hours.</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <Layers className="h-12 w-12 text-primary" />
                        <h3 className="text-xl font-bold">Notion-like Funnel Editor</h3>
                        <p className="text-gray-500 dark:text-gray-400">Intuitive interface for effortless funnel building.</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <CheckCircle className="h-12 w-12 text-primary" />
                        <h3 className="text-xl font-bold">Conversion Optimized</h3>
                        <p className="text-gray-500 dark:text-gray-400">Easily adaptable funnels for continuous conversion rate optimization.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}