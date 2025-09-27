'use client'

import { z } from 'zod';
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
import {useEffect, useState} from "react";
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useSession} from "next-auth/react";
import { toast } from "sonner";
import {getUser, updateUserProfile} from "@/app/actions";
import {User} from "@prisma/client";



const UpdateProfileForm = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [visibleCurrent, setVisibleCurrent] = useState(false);
    const [visibleNew, setVisibleNew] = useState(false);
    const [userData, setUserData] = useState<User|null|undefined>();


    useEffect(() => {
        const fetchUser= async ()=>{
            if(session?.user?.email){
                const currentUser= await getUser(session.user.email)
                if(!currentUser) return ;
                setUserData(currentUser)
                form.reset({
                    name: currentUser?.name||"",
                    currentPassword: "",
                    newPassword: "",

                })

            }
        }
        fetchUser();
    }, [session]);

    const formSchema = z.object({
        name: z.string().min(1, { message: "Name is required" }),
        currentPassword: z.string().optional(),
        newPassword: z.string()
            .refine((val) => {
                if (!val) return true; // αν είναι κενό, δεν κάνουμε validation
                return (
                    val.length >= 6 &&
                    val.length <= 16 &&
                    /[a-zA-Z]/.test(val) &&
                    /[0-9]/.test(val) &&
                    /[^a-zA-Z0-9]/.test(val)
                );
            }, {
                message:
                    "Password must be 6-16 chars, include 1 letter, 1 number & 1 special character",
            }),
    }).refine(data => {
        if (data.newPassword) return !!data.currentPassword;
        return true;
    }, {
        message: "Current password is required to change password",
        path: ["currentPassword"],
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: userData?.name || '',
            currentPassword: '',
            newPassword: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            await updateUserProfile(values.name,values.currentPassword,values.newPassword);
            toast.success("Profile updated successfully!");

        } catch (e) {
            toast.error((e as Error).message);
        } finally {
            setLoading(false);
            form.reset({
                name: values.name,
                currentPassword: '',
                newPassword: ''
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-1/5 max-w-md mx-auto p-5 rounded-2xl bg-bg/50 shadow-md shadow-second/60">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Your name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input value={session?.user?.email || ''} readOnly />
                    </FormControl>
                </FormItem>

                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password(if you want to change it)</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} type={visibleCurrent ? "text" : "password"} placeholder="Current password" />
                                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setVisibleCurrent(!visibleCurrent)}>
                                        {visibleCurrent ? <EyeIcon className="h-4 w-4 cursor-pointer"/> : <EyeOffIcon className="h-4 w-4 cursor-pointer"/>}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} type={visibleNew ? "text" : "password"} placeholder="New password" />
                                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setVisibleNew(!visibleNew)}>
                                        {visibleNew ? <EyeIcon className="h-4 w-4 cursor-pointer"/> : <EyeOffIcon className="h-4 w-4 cursor-pointer"/>}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full! my-button button-glow" type="submit" disabled={loading}>{loading ? "Updating..." : "Update Profile"}</Button>
            </form>
        </Form>
    );
};

export default UpdateProfileForm;
