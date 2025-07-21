import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {auth} from "@/auth";
import SignOut from "@/components/sign-out";

const Navbar = async () => {
    const session = await auth();
    return (
        <nav className="w-full">
            <div className="mx-auto px-10 py-3 flex items-center justify-between">

                <div className="flex items-center gap-30">

                    <Link href="/" className="text-xl font-bold text-primary">
                        <Image className="glow" src={"/noBgColor.png"} alt={"logo"} width={400} height={40} ></Image>
                    </Link>


                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-20 ">

                            <NavigationMenuItem className="cursor-pointer">
                                <NavigationMenuTrigger className="bg-bg hover:bg-bg cursor-pointer">
                                    Cinemas
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-bg text-text  ">
                                    <ul className="grid gap-2 p-4 w-48">
                                        <li>

                                                <NavigationMenuLink className="block px-3 py-2 rounded-md  text-sm">
                                                    Athens
                                                </NavigationMenuLink>

                                        </li>
                                        <li>

                                                <NavigationMenuLink className="block px-3 py-2 rounded-md hover:bg-second text-sm">
                                                    Thessaloniki
                                                </NavigationMenuLink>

                                        </li>

                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>


                            <NavigationMenuItem>

                                    <NavigationMenuLink className="cursor-pointer text-center rounded-4xl  w-[100px] hover:bg-bg hover:text-text">
                                        About
                                    </NavigationMenuLink>

                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div>{session && session?.user? (<div className="flex"><span className="mx-3"> Hello {session.user?.name}</span> <SignOut/></div>):(<Link href="/login">
                    <Button className="cursor-pointer rounded-4xl bg-primer w-[100px] hover:bg-second button-glow">Login</Button>
                </Link>)}

                </div>
            </div>
        </nav>
    )
}
export default Navbar
