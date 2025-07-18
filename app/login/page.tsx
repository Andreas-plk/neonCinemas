import React from 'react'
import Image from "next/image";
import CardForm from "@/components/CardForm";
import Link from "next/link";

const LoginForm = () => {
    return (
        <div className="flex flex-col justify-between items-center">
            <Link href={"/"}><Image className="mt-15" src={"/noBgColor.png"} alt={"logo"}   width={400} height={400} /></Link>

            <div className=" mt-10">
                <CardForm/>
            </div>
        </div>

    )
}
export default LoginForm
