'use server';

import { ResetSchema } from "@/app/app/(auth)/_components/schemas";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

export async function resetPassword(data: z.infer<typeof ResetSchema>) {
    const supabase = createClient()

    const validation = ResetSchema.safeParse(data)
    if (!validation.success) {
        console.log("Failed server validation")
        return { error: "Something went wrong!" }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `app.${process.env.NEXT_PUBLIC_URL}/new-password`,
    })

    console.log('Email sent to:', data.email, ' url:', `app.${process.env.NEXT_PUBLIC_URL}/new-password`)

    if (error) {
        console.log(error)
    }

    return { success: "Password reset email sent!" };

}