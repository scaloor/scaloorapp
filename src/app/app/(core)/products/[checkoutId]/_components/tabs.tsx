'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/_components/ui/tabs"
import { motion } from "framer-motion"
import CheckoutExport from "./export"
import CheckoutView from "./view"
import { SelectCheckout } from "@/server/db/schema"
import CheckoutAnalytics from "./analytics"
import { ScrollArea } from "@/app/_components/ui/scroll-area"

type CheckoutTabsProps = {
    dbCheckout: SelectCheckout
}

export default function CheckoutTabs({ dbCheckout }: CheckoutTabsProps) {
    return (
        <Tabs defaultValue="view" className="w-1/2">
            <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="view" className="w-full">View</TabsTrigger>
                <TabsTrigger value="export" className="w-full">Export</TabsTrigger>
                <TabsTrigger value="analytics" className="w-full">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="view">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <CheckoutView dbCheckout={dbCheckout} />
                </motion.div>
            </TabsContent>
            <TabsContent value="export">
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <CheckoutExport />
                </motion.div>
            </TabsContent>
            <TabsContent value="analytics">
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <CheckoutAnalytics />
                </motion.div>
            </TabsContent>

        </Tabs >
    )
}