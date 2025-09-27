"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {UserCog} from "lucide-react"
import {signOut} from "next-auth/react";

const UserDropdown = ({ user }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-3 py-5 cursor-pointer bg-second/30 border-3 border-second/50 ">
                    <UserCog className="size-9"/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                    <Link className="cursor-pointer" href="/profile/edit">Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <p className="cursor-pointer" onClick={() => signOut()}>Sign out</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
