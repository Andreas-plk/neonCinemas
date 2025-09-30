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
import {EyeIcon, EyeOffIcon, Trash} from 'lucide-react';
import {signOut, useSession} from "next-auth/react";
import { toast } from "sonner";
import {deleteUser, getUser, updateUserProfile} from "@/app/actions";
import {User} from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {useRouter} from "next/navigation";



const UpdateProfileForm = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [visibleCurrent, setVisibleCurrent] = useState(false);
    const [visibleNew, setVisibleNew] = useState(false);
    const [userData, setUserData] = useState<User|null|undefined>();
    const [dialog, setDialog] = useState(false)
    const [error, setError] = useState('')
    const [password, setPassword] = useState("");
    const router = useRouter()

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

    const handleDelete = async (email:string,password:string) => {
        setError("");

        try {
            await deleteUser(email, password);
            await signOut()
            router.push("/");
        } catch (e: any) {
            setError(e.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
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
            <div className="flex justify-center mt-10">
            <Button variant="destructive" className="cursor-pointer" onClick={()=>setDialog(true)}>Delete Profile</Button>
                <Dialog open={dialog} onOpenChange={() => setDialog(false)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm deletion</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone.Your account will be deleted and you will lose access to all your tickets.(Tickets are still valid if you have the PDF)
                            </DialogDescription>
                        </DialogHeader>
                        {/* Password Input */}
                        <div className="mt-4">
                            <Label
                                htmlFor="password" className="block text-sm font-medium ">
                                Enter your password
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                                placeholder="Password"
                            />
                            {error && <span className="text-sm text-red-500">{error}</span>}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" className="cursor-pointer" onClick={() => setDialog(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                className="cursor-pointer"
                                onClick={() => handleDelete(session?.user?.email?session.user.email:"",password)}
                            >
                                <Trash size={14}/> Delete
                            </Button>

                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default UpdateProfileForm;
