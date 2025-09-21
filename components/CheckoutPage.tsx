'use client'
import {useState,useEffect} from "react";
import {
    useElements,
    PaymentElement,
    useStripe,
} from "@stripe/react-stripe-js";
import {convertToSubcurrency} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {BeatLoader, CircleLoader} from "react-spinners";
import {useParams} from "next/navigation";
import {Ticket} from "@/types/types";


const CheckoutPage = ({amount,tickets}:{amount:number,tickets:Ticket[]}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const[loading, setLoading] = useState(false);
    const {screeningId}=useParams();

    console.log(tickets)

    useEffect(() => {
        if (!tickets || tickets.length === 0 || amount === 0) return;
        fetch("/api/checkout_sessions",{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body:JSON.stringify({amount:convertToSubcurrency(amount),
            screeningId,
            tickets})
        }).then((res)=>res.json())
            .then((data)=>setClientSecret(data.clientSecret));
    }, [amount,screeningId,tickets]);


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if(!stripe || !elements ) return;


        const {error:submitError}=await elements.submit();

        if (submitError){
            setError(submitError.message);
            setLoading(false);
            return;
        }

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams:{
                return_url:`http://localhost:3000/booking/success`,
            }
        })

        if(error){
            setError(error.message);
        }

        setLoading(false);
    }



    return (
        <div className="flex justify-center items-center ">
            <form onSubmit={handleSubmit}>
                {clientSecret ?<div> <PaymentElement
                options={{
                    layout:"accordion"
                }}/>
                    <Button disabled={loading} className="my-button button-glow my-5 w-full!">
                        {loading ? <BeatLoader color={"#EDEDED"} speedMultiplier={0.5}/> : `Pay ${amount}€`}

                    </Button>
                </div>:<CircleLoader color={"#FF7675"}/>
                }
                {error && <div>{error}</div>}

            </form>
        </div>
    )
}
export default CheckoutPage
