"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { resetPassword } from "@/app/actions";


const forgotPasswordSchema = z.object({
    email: z.email({error: "Email is required"}),
});

type ForgotFormType = z.infer<typeof forgotPasswordSchema>;


export default function ForgotPasswordForm() {
    const [loading, setLoading] = useState(false);

    const form = useForm<ForgotFormType>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (values: ForgotFormType) => {
        try {
            setLoading(true);
            await resetPassword({email: values.email});
            toast.success("Check your email for reset link");
        } catch (err) {
            toast.error((err as Error).message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full max-w-md mx-auto p-8 rounded-md shadow-md shadow-second md:mt-20">
            <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant="outline" className="w-full cursor-pointer" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
