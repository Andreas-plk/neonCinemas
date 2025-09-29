"use client";

import{ useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import SignInClient from "@/components/sign-in-client";
import {signIn} from "next-auth/react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

type CardProps = {
    onClick: (e: React.SyntheticEvent) => void;
};


const CardLoginForm: React.FC<CardProps> = ({ onClick }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const formSchema = z.object({
        email: z
            .email({ error: "Email is required" }),
        password: z.string({error:"Password is required"})
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect:false ,
        });

        if (res?.error) {
            toast.error("Wrong email or password. Please try again.");
        } else {
           router.push("/");
        }
        setLoading(false)
    }

    return (
        <div className="relative bg-[linear-gradient(to_bottom,_theme(colors.bg)_53%,_theme(colors.second)_7%)]
        md:bg-[linear-gradient(to_right,_theme(colors.bg)_50%,_theme(colors.second)_50%)]
        rounded-md w-full max-w-5xl h-auto md:h-[60vh] md:w-[70vw] shadow-md shadow-primer/50 flex flex-col md:flex-row overflow-hidden">

            <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-5 tracking-widest">LOGIN</h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 w-full max-w-[300px]"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-primer border-none text-black focus:shadow-lg focus:shadow-second/70"
                                            placeholder="demo@email.com"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                className="bg-primer border-none text-black focus:shadow-lg focus:shadow-second/70"
                                                placeholder="********"
                                                type={visible ? "text" : "password"}
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-black cursor-pointer"
                                                onClick={() => setVisible(!visible)}
                                                tabIndex={-1}
                                            >
                                                {!visible ? (
                                                    <EyeOffIcon className="h-4 w-4" />
                                                ) : (
                                                    <EyeIcon className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <span className="w-full flex justify-end">
                                        <p
                                            className="text-xs text-text/90 cursor-pointer"
                                            onClick={() => router.push("/forgot-password")}
                                        >
                                            Forgot Password?
                                        </p>
                                    </span>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row justify-between items-center">
                            <Button disabled={loading} className="!w-full my-button button-glow" type="submit">{loading ?"loading...":"Login"}</Button>

                        </div>
                    </form>
                </Form>
                <p className="text-primer border-none rounded-full flex p-1 hover:text-second button-glow md:mt-2">
                    <SignInClient/>
                </p>
            </div>

            <div className="w-full md:w-1/2  p-6 text-black flex flex-col justify-center items-center text-center">
                <div className="max-w-sm">
                    <h1 className="text-3xl font-bold uppercase mb-4">Welcome back</h1>
                    <p className="mb-3">
                        Join us and experience NEON CINEMAS. We have all the latest movies
                        for every taste. Get ready for another unforgettable experience in
                        our state-of-the-art facilities.
                    </p>
                </div>
                <div className="text-center">
                    <p className="mb-3">You don’t have an account yet?</p>
                    <Button className="cursor-pointer" onClick={onClick}>
                        Create one here
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CardLoginForm;
