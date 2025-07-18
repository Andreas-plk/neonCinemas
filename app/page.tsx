import React from 'react'
import SignIn from "@/components/sign-in";
import {auth} from "@/auth";
import SignOut from "@/components/sign-out";

const Page =async () => {
    const session = await auth();
    return (
        <div className="flex flex-col justify-between items-center">Page
            {session && session?.user? (<div>Hello {session.user.name} <SignOut/></div> ):( <SignIn/>)}

        </div>

    )
}
export default Page
