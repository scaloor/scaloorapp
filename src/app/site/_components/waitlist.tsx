"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { toast } from "sonner"
import { addToWaitlist } from "@/server/actions/public/waitlist"

export default function EmailCapture() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState<Boolean | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const result = await addToWaitlist(email)
        setIsLoading(false)

        if (result.error) {
            toast.error(result.error)
            return setIsSuccess(false)
        }

        setIsSuccess(true)
        toast.success("You've been added to our waitlist. We'll be in touch soon!")
    }

    return (
        <>
            <div id="waitlist" className="h-10" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Join Our Waitlist</h2>
                <p className="text-muted-foreground mb-6 text-center">
                    Be the first to know when we launch. Sign up for exclusive early access!
                </p>
                {isSuccess === null && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full"
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Join Waitlist"
                            )}
                        </Button>
                    </form>
                )}
                {isSuccess === true && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center text-green-600 font-semibold"
                    >
                        Thank you for joining our waitlist!
                    </motion.div>
                )}
                {isSuccess === false && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center text-red-600 font-semibold"
                    >
                        Email already on waitlist.
                    </motion.div>
                )}
            </motion.div>
        </>
    )
}