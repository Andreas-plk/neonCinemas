
"use client"

import { signIn } from "next-auth/react"
import {GrGoogle} from "react-icons/gr";

export default function SignInClient() {
    return <button className="cursor-pointer" onClick={() => signIn("google")}><GrGoogle className="w-8 h-8"/></button>
}
