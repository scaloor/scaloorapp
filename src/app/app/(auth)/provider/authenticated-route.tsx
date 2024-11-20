import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export const getSessionUser = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()
    return { user: data?.user, error: error }
}

export default async function AuthenicatedRoute({ children }: { children: React.ReactNode }) {
    const { user, error } = await getSessionUser()
    if (error || !user) {
        console.log('Redirecting to login', error, user)
        redirect('/login')
    }
    

    return (
        <>
            {children}
        </>
    )
}