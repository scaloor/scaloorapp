import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const getSessionUser = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser()
    return { user: data?.user, error: error }
}

export async function AuthenicatedRoute({ children }: { children: React.ReactNode }) {
    const { user, error } = await getSessionUser()
    if (error || !user) {
        redirect('/auth/login')
    }
    

    return (
        <>
            {children}
        </>
    )
}