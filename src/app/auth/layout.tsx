import { getAuthUserDetails } from "@/server/actions/users";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const { dbUser: user } = await getAuthUserDetails();
    if (user) {
        return redirect('/account/settings')
    }
    return (
        <div className="h-full flex items-center justify-center">
            {children}
        </div>
    )
}