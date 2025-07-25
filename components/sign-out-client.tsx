
"use client"

import { signOut } from "next-auth/react"
import {GrGoogle} from "react-icons/gr";
import {Button} from "@/components/ui/button";

export default function SignOutClient() {
    return <Button className="my-button button-glow" onClick={() => signOut()}>Sign Out</Button>
}
