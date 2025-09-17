"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";


const adminPassword ="1234";

const Page = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === adminPassword) {
            router.push("/admin/dashboard");
        } else {
            setError("Wrong Password");
        }
    };
    return (
        <div className="flex h-svh justify-center items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center">
            <h1 className="text-center">To enter the admin dashboard <br/> please insert the code</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="p-2 border rounded"
                />
                <Button type="submit" className="my-button button-glow">
                    Login
                </Button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    )
}
export default Page
