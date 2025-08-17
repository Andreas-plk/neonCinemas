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

type CardProps = {
    onClick: (e: React.SyntheticEvent) => void;
};
const CardSignUpForm :React.FC<CardProps> = ({onClick}) => {

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleRepeat, setVisibleRepeat] = useState(false);
    const formSchema = z.object({
        email: z.email({
            error: 'Email is required',
        }),
        password: z.string().min(6, {
            message: 'Password must be at least 6 characters',
        }).max(16, {
            message: 'Password must be at most 16 characters',
        }).regex(/[a-zA-Z]/, {message: 'Contain at least one letter.'})
            .regex(/[0-9]/, {message: 'Contain at least one number.'})
            .regex(/[^a-zA-Z0-9]/, {
                message: 'Contain at least one special character.',
            })
            .trim(),
        confirmPassword: z.string().trim(),
    }).refine((data) => data.password === data.confirmPassword,{
        message: "Passwords don't match",
        path:['confirmPassword'],
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword:"",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="relative bg-[linear-gradient(to_bottom,_theme(colors.bg)_55%,_theme(colors.second)_45%)]
        md:bg-[linear-gradient(to_right,_theme(colors.bg)_50%,_theme(colors.second)_50%)]
        rounded-md w-full max-w-5xl h-auto md:h-[60vh] md:w-[70vw] shadow-md shadow-primer/50 flex flex-col md:flex-row overflow-hidden">


                <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-3 tracking-widest">SIGN UP</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-[300px]">
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
                                            <Input className="bg-primer border-none  text-black focus:shadow-lg focus:shadow-second/70" placeholder="********"  {...field} type={visiblePassword ? 'text' : 'password'}/>
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-black  cursor-pointer"
                                                onClick={() => setVisiblePassword(!visiblePassword)}
                                                tabIndex={-1}
                                            >
                                                {!visiblePassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>


                            )}
                        />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Repeat Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input className="bg-primer border-none  text-black focus:shadow-lg focus:shadow-second/70" placeholder="********"  {...field} type={visibleRepeat ? 'text' : 'password'}/>
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-black  cursor-pointer"
                                                    onClick={() => setVisibleRepeat(!visibleRepeat)}
                                                    tabIndex={-1}
                                                >
                                                    {!visibleRepeat ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>)}
                            />
                            <div className="flex flex-row justify-between items-center">
                                <Button className="!w-full my-button button-glow" type="submit">Sign Up</Button>

                            </div>

                        </form>
                    </Form>

                    <p className="text-primer border-none rounded-full flex p-1 hover:text-second button-glow">
                        <SignInClient/>
                    </p>

                </div>


                <div className="w-full md:w-1/2  p-6 text-black flex flex-col justify-center items-center text-center">
                    <div className="max-w-sm">
                        <h1 className="text-3xl font-bold uppercase  mb-4">welcome</h1>
                        <p className="mb-3">Create an account and experience NEON CINEMAS.
                            We have all the latest movies for every taste.
                            Get ready for another unforgettable experience
                            in our state-of-the-art facilities.
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="mb-3">
                            You already have an account?
                        </p>
                        <Button className="cursor-pointer" onClick={onClick}>Login here</Button>
                    </div>
                </div>
            </div>


    )
}
export default CardSignUpForm
