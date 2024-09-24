import React from 'react'


export default function Features() {
    return (
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
                <div className="grid gap-10 md:grid-cols-3">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">1</div>
                        <h3 className="text-xl font-bold">Build a Funnel in Minutes</h3>
                        <p className="text-gray-500 dark:text-gray-400">Quickly create your sales funnel using our intuitive tools and templates.</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">2</div>
                        <h3 className="text-xl font-bold">Launch Your Funnel</h3>
                        <p className="text-gray-500 dark:text-gray-400">Publish your funnel with a single click and start attracting customers.</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">3</div>
                        <h3 className="text-xl font-bold">Get Sales and Optimize</h3>
                        <p className="text-gray-500 dark:text-gray-400">Drive sales and continuously improve your conversion rates.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}