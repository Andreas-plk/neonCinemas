"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EmailModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
};

export function EmailModal({ open, onClose, onSubmit }: EmailModalProps) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (value: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const handleSubmit = () => {
        if (!email) {
            setError("Please fill in your email");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please fill in a valid email");
            return;
        }
        setError("");
        onSubmit(email);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Looks like you are not logged in.</DialogTitle>
                </DialogHeader>
                <p className="text-sm">Please fill out your email to receive the tickets</p>
                <div className="space-y-4">
                    <Input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <DialogFooter>
                    <Button
                        className="my-button button-glow !w-[200px]"
                        onClick={() => {
                           handleSubmit();
                        }}
                    >
                        Go to payment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
