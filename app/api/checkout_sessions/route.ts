import {NextRequest, NextResponse} from "next/server";
import {Ticket} from "@/types/types";
import {stripe} from "@/lib/stripe";
import {auth} from "@/auth";

export async function POST(req: NextRequest) {
    const session= await auth();
    const email=session?.user?.email
    try {
        const { amount, screeningId, tickets } = await req.json();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "eur",
            metadata: {
                screeningId,
                tickets: JSON.stringify(
                    tickets.map((ticket:Ticket) => ({ seat: ticket.seat, type: ticket.type }))
                ),
                ...(email ? {email}:{})
            },
        });
        return NextResponse.json({clientSecret: paymentIntent.client_secret})
    }catch (error) {
        console.error(error);
        return NextResponse.json(
            {error:`Internal server error: ${error}`},
            {status:500})
    }
}