import { getAuthUserDetails } from "@/server/actions/protected/users";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const { dbUser: user } = await getAuthUserDetails();
    if (user) {
        return redirect('/dashboard')
    }
    return (
        <div className="h-full flex items-center justify-center">
            {children}
        </div>
    )
}