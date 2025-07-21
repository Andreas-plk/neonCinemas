'use client'
import React from 'react'
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useState} from "react";
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import SignInClient from "@/components/sign-in-client";
import Link from "next/link";


const CardLoginForm = () => {

    const [visible, setVisible] = useState(false);
    const formSchema = z.object({
        email: z.email({
            error: 'Email is required',
        }),
        password: z.string().min(6,{
            message: 'Password must be at least 6 characters',
        }).max(16,{
            message: 'Password must be at most 16 characters',
        }).regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
            .regex(/[0-9]/, { message: 'Contain at least one number.' })
            .regex(/[^a-zA-Z0-9]/, {
                message: 'Contain at least one special character.',
            })
            .trim(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="relative bg-[linear-gradient(to_right,_theme(colors.bg)_50%,_theme(colors.second)_50%)]  rounded-md
        w-[70vw] h-[60vh] shadow-md shadow-primer/50 flex">
            <div className="absolute inset-0 flex">

                <div className="w-1/2 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-3 tracking-widest">LOGIN</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input className="bg-primer border-none text-black focus:shadow-lg focus:shadow-second/70 focus:border-none" placeholder="demo@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            /> <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input className="bg-primer border-none w-[250px] text-black focus:shadow-lg focus:shadow-second/70" placeholder="********"  {...field} type={visible ? 'text' : 'password'}/>
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-black  cursor-pointer"
                                                onClick={() => setVisible(!visible)}
                                                tabIndex={-1}
                                            >
                                                {!visible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />  <span className="flex flex-row justify-between items-center">
                                <Button className="cursor-pointer rounded-4xl bg-primer w-[100px] hover:bg-second button-glow" type="submit">Login</Button>
                            <p className=" font-semibold">OR USE</p>
                            <p className="text-primer border-none rounded-full flex p-1 hover:text-second button-glow"><SignInClient/></p>
                            </span>

                        </form>
                    </Form>
                </div>


                <div className="w-1/2 flex flex-col items-center justify-center text-black">
                    <div className="w-3/4 flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold uppercase  mb-5">welcome back</h1>
                        <p className="mb-5 text-center">Join us and experience NEON CINEMAS.
                            We have all the latest movies for every taste.
                            Get ready for another unforgettable experience
                            in our state-of-the-art facilities.  </p>
                    </div>
                    <div className="flex flex-col items-center justify-center ">
                        <p className= "mb-3">
                            You don`t have an account yet?
                        </p>
                        <Button><Link href="/sign-up">Create one here</Link> </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default CardLoginForm
