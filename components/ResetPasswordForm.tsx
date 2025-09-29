"use client";

import { useState } from "react";
import {useParams, useRouter} from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { updatePassword } from "@/app/actions";


const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(16, "Password must be at most 16 characters")
            .regex(/[a-zA-Z]/, "Contain at least one letter")
            .regex(/[0-9]/, "Contain at least one number")
            .regex(/[^a-zA-Z0-9]/, "Contain at least one special character")
            .trim(),
        confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type ResetFormType = z.infer<typeof resetPasswordSchema>;


export default function ResetPasswordForm() {
    const router = useRouter();
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleRepeat, setVisibleRepeat] = useState(false);
    const [loading, setLoading] = useState(false);
    const {token} = useParams();
    const form = useForm<ResetFormType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });


    const onSubmit = async (values: ResetFormType) => {
        if (!token) {
            toast.error("Invalid or missing token");
            return;
        }

        try {
            setLoading(true);
            await updatePassword({token ,password:values.password,confirmPassword:values.confirmPassword});
            toast.success("Password updated successfully");
            router.push("/authorization"); // redirect στη login page
        } catch (err) {
            toast.error((err as Error).message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full max-w-md mx-auto p-8  rounded-md shadow-md shadow-second md:mt-20">
            <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={visiblePassword ? "text" : "password"}
                                            placeholder="********"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                            onClick={() => setVisiblePassword(!visiblePassword)}
                                            tabIndex={-1}
                                        >
                                            {visiblePassword ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
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
                                        <Input
                                            type={visibleRepeat ? "text" : "password"}
                                            placeholder="********"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                            onClick={() => setVisibleRepeat(!visibleRepeat)}
                                            tabIndex={-1}
                                        >
                                            {visibleRepeat ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button type="submit" variant="outline" className="w-full cursor-pointer" disabled={loading}>
                        {loading ? "Updating..." : "Reset Password"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
