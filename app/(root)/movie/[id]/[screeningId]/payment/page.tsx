'use client';
import { useTickets } from "@/context/TicketContext";
import {redirect} from "next/navigation";
import {getStripe,convertToSubcurrency} from '@/lib/utils'
import {Elements} from '@stripe/react-stripe-js';
import CheckoutPage from "@/components/CheckoutPage";


const stripe = getStripe();

const Page =  () => {

    const { tickets } = useTickets();
    if (tickets.length===0)redirect('/') ;
    return (
        <div className='flex flex-col justify-center   md:flex-row m-2 md:m-10 gap-8'>
            {/* Ticket list */}
            <div className="w-full md:w-1/3 p-4 bg-second/10 border border-[#333] rounded-lg shadow-md">
                <h1 className=" text-xl font-semibold mb-4 text-center">Your Tickets</h1>
                <div className="flex flex-col gap-3">
                    {tickets.map((t, i) => (
                        <div
                            key={i}
                            className="p-3 bg-[#2A2A2A] border border-[#444] rounded-md flex justify-between items-center "
                        >
                            <span>Selected Seat: {t.seat}</span>
                            <span>Type: {t.type}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-1/3  p-6 bg-second/10 border border-[#333] rounded-lg shadow-md">
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
                }}>
                    <CheckoutPage amount={50}></CheckoutPage>
                </Elements>
            </div>
        </div>
    )
}
export default Page
