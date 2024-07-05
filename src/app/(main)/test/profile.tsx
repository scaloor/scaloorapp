
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/app/_components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/app/_components/ui/dropdown-menu"
import { signOut } from "@/server/actions/auth/sign-out";
import { getAuthUserDetails } from "@/server/actions/users";
import { getBusinessById } from "@/server/data/business";
/* import { SignOutButton, useUser } from "@clerk/nextjs" */
import {
    CreditCard,
    LogOut,
    Settings,
    User
} from "lucide-react"
import Link from "next/link"

const getUserAndBusiness = async () => {
    const user = await getAuthUserDetails();
    const business = await getBusinessById(user!.businessId!);
    return { user, business };
}

export function Profile() {

    return (
        <DropdownMenu>
            <div>
                <p className='font-semibold text-start'>Test Business</p>
            </div>
            <DropdownMenuTrigger asChild className="w-[2.25rem] h-[2.25rem]">
                <Avatar >
                    <AvatarImage src={''} alt="User Profile" />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                    Oliver Markey
                </DropdownMenuLabel>
                
                <DropdownMenuGroup>
                    <Link href="/user-profile">
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/settings">
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => signOut()}>
                    
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}