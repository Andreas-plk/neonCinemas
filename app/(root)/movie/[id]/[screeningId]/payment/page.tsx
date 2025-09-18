'use client';
import {useTickets} from "@/context/TicketContext";
import {redirect, useParams} from "next/navigation";
import {convertToSubcurrency, formatPrice, getStripe} from '@/lib/utils'
import {Elements} from '@stripe/react-stripe-js';
import CheckoutPage from "@/components/CheckoutPage";
import {Ticket} from "@/types/types";
import {useEffect, useState} from "react";


const stripe = getStripe();
const Page = () => {
    const { tickets } = useTickets();
    const [total, setTotal] = useState(0)
    const getFullPrice = (tickets:Ticket[]) => {
        setTotal(tickets.reduce((sum, ticket) =>{
            if (typeof ticket.price === 'number') {
                return sum + ticket.price;
            }
            return sum;
        }, 0))
    };
    if (tickets.length===0)redirect('/') ;

    useEffect(() => {
        getFullPrice(tickets)
    }, [tickets])


    return (
        <div className="flex flex-col justify-center md:flex-row m-4 md:m-10 gap-8">
            {/* Ticket list */}
            <div className="w-full md:w-1/3 p-6 bg-bg/20 backdrop-blur-2xl border border-second/20 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-second">Your Tickets</h1>
                <div className="flex flex-col gap-4">
                    {tickets.map((t, i) => (
                        <div
                            key={i}
                            className="p-4 bg-[#252525] border border-second/20 rounded-lg flex justify-between items-start hover:scale-[1.02] transition-transform duration-200 shadow-md"
                        >
                            <p className="text-sm ">
                                Selected Seat: <span className="font-semibold text-shadow-black">{t.seat}</span>
                                <br />
                                Price: <span className="text-second font-semibold">{formatPrice(t.price)}</span>
                            </p>
                            <p className="text-sm ">
                                Type: <span className="font-medium">{t.type}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment */}
            <div className="w-full md:w-1/3">
                <div className="sticky top-20 p-6 bg-bg/20 backdrop-blur-2xl border border-second/30 rounded-xl shadow-lg">
                    <Elements
                        stripe={stripe}
                        options={{
                            mode:"payment",
                            amount:convertToSubcurrency(50),
                            currency:"eur",
                            payment_method_configuration:'pmc_1Rw3i6FrTq2tG8lZNrvvGgxR',
                            appearance: {
                                theme: 'night',
                                variables: {
                                    colorBackground: '#1E1E1E',
                                    colorText: '#EDEDED',
                                    colorPrimary: '#FF7675',
                                    colorDanger: '#FF4C4C',
                                    borderRadius: '8px',
                                    fontFamily: 'inherit',
                                },
                                rules: {
                                    '.Input': {
                                        backgroundColor: '#2A2A2A',
                                        border: '1px solid #444',
                                        color: '#EDEDED',
                                        padding: '10px',
                                    },
                                    '.Input:focus': {
                                        borderColor: '#FF7675',
                                    },
                                    '.Label': {
                                        color: '#EDEDED',
                                    },
                                    '.Tab': {
                                        color: '#EDEDED',
                                    },
                                    '.PaymentElement': { backgroundColor: '#1E1E1E' },
                                },
                            },
                        }}
                    >
                        <CheckoutPage amount={total} tickets={tickets} />
                    </Elements>
                </div>
            </div>
        </div>

    )
}
export default Page
