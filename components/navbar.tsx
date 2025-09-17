"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import SignOutClient from "@/components/sign-out-client";
import { Menu, X } from "lucide-react";
import {useSession} from "next-auth/react";
import {Cinema} from "@prisma/client";



const Navbar =  () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [cinemas, setCinemas] = useState([])
    const { data: session }=useSession();
    useEffect(() => {
        try {
            fetch("/api/get_cinemas").
            then((res) => res.json()).then((data) => setCinemas(data));
        }catch (err){
            console.log(err);
        }

    },[])
    return (
        <nav className="relative w-full rounded-b-xl z-50 fade-shadow-right">
            <div className="mx-auto px-4 md:px-10 py-3 flex items-center justify-between">
                <Link href="/" className="flex-shrink-0">
                    <Image
                        className="glow w-[150px] md:w-[250px]"
                        src={"/noBgColor.png"}
                        alt="logo"
                        width={250}
                        height={100}
                    />
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-6 transition-all">
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-second transition cursor-pointer">
                                    Cinemas
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-bg text-text">
                                    <ul className="grid gap-2 p-4 w-48">
                                        {cinemas.map((cinema:Cinema,idx) => (
                                            <li key={idx}>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href="#"
                                                        className="block px-3 py-2 rounded-md hover:bg-second text-sm"
                                                    >
                                                        {cinema.name}
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}

                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="#"
                                        className="cursor-pointer rounded-4xl w-[100px] text-center hover:bg-second hover:text-black py-2"
                                    >
                                        About
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            {session?.user ? (
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href="/favorites"
                                            className="cursor-pointer rounded-4xl w-[100px] text-center hover:bg-second hover:text-black py-2"
                                        >
                                            Favorites
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ) : (
                                <></>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {session?.user ? (
                        <>
                            <span>Hello {session.user.name}</span>
                            <SignOutClient />
                        </>
                    ) : (
                        <Link href="/authorization">
                            <Button className="my-button button-glow">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile menu toggle */}
                <button

                    className="md:hidden p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div  className="md:hidden px-4 pb-4 space-y-4">
                    <div>
                        <p className="font-semibold">Cinemas</p>
                        <ul className="ml-2 mt-2 space-y-2 text-sm">
                            <li>
                                <Link href="#" className="block hover:text-second">
                                    Athens
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="block hover:text-second">
                                    Thessaloniki
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link href="#" className="block hover:text-second font-semibold">
                        About
                    </Link>
                    {session?.user ? (
                        <div className="flex flex-col gap-2">
                            <span>Hello {session.user.name}</span>
                            <SignOutClient />
                        </div>
                    ) : (
                        <Link href="/authorization">
                            <Button className="w-full bg-primer hover:bg-second button-glow">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
