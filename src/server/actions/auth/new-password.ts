'use server';
import { NewPasswordSchema } from "@/app/app/(auth)/_components/schemas";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";


export async function newPassword(data: z.infer<typeof NewPasswordSchema>) {
    const supabase = createClient()

    const validation = NewPasswordSchema.safeParse(data)
    if (!validation.success) {
        console.log("Failed server validation")
        return { error: "Something went wrong!" }
    }

    const { error } = await supabase.auth.updateUser({
        password: data.password,
    })

    if (error) {
        console.log(error)
        return { error: "Something went wrong!" }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}