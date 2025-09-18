import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import {stripe} from "@/lib/stripe";
import {Stripe} from "stripe"
import prisma  from "@/prisma";
import { SeatType } from "@prisma/client";



export async function POST(req: NextRequest)  {
    const body = await req.text();
    const headersList = await headers();
    const sig =headersList.get('stripe-signature')as string;

   if(!process.env.STRIPE_WEBHOOK_SECRET){
       throw new Error('NO WEBHOOK_SECRET provided');
   }

   const event = stripe.webhooks.constructEvent(body,sig,process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent ;

        const screeningId = paymentIntent.metadata.screeningId;
        const tickets = JSON.parse(paymentIntent.metadata.tickets || "[]");
        const amount = paymentIntent.amount / 100; // από cents → €

        console.log("Webhook hit! Tickets:", tickets);

        try {
            await prisma.booking.create({
                data: {
                    totalPrice: amount,
                    screeningId,
                    selectedSeats: {
                        create: tickets.map((t: { seat: string; type: SeatType }) => ({
                            seat: t.seat,
                            type: t.type,
                        })),
                    },
                },
            });
            console.log("Booking created successfully!");
        } catch (error) {
            console.error("Booking creation failed:", error);
        }
    }

    return NextResponse.json({ received: true });
}
