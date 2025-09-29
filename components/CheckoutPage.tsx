'use client'
import {useState, useEffect} from "react";
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
import {useTickets} from "@/context/TicketContext";
import {Input} from "@/components/ui/input";
import {getVoucherDiscount} from "@/app/actions";
import {Label} from "@/components/ui/label";


const CheckoutPage = ({amount,tickets}:{amount:number,tickets:Ticket[]}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [voucherCode, setVoucherCode] = useState("");
    const [voucherLoading, setVoucherLoading] = useState(false);
    const [voucherError, setVoucherError] = useState<string | null>(null);
    const [voucherSuccess, setVoucherSuccess] = useState<string | null>(null)
    const [finalAmount, setFinalAmount] = useState(amount)
    const[loading, setLoading] = useState(false);
    const {screeningId}=useParams();
    const {guestEmail}=useTickets();


    useEffect(() => {
        if (!tickets || tickets.length === 0 || amount === 0) return;
        fetch("/api/checkout_sessions",{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body:JSON.stringify({amount:convertToSubcurrency(amount),
            screeningId,
            tickets,
            guestEmail,
            })
        }).then((res)=>res.json())
            .then((data)=>setClientSecret(data.clientSecret));

    }, [amount,screeningId,tickets,guestEmail]);
    useEffect(() => {
        setFinalAmount(amount)
    }, [amount]);

    const applyVoucher = async () => {
        setVoucherLoading(true);
        setVoucherError(null);
        setVoucherSuccess(null);
        try {
            const discountAmount  = await getVoucherDiscount(voucherCode, amount);

            if (discountAmount  === "No voucher discount found.") {
                setVoucherError(discountAmount );
                setVoucherLoading(false);
                return;
            }
            const newAmount= discountAmount
            setFinalAmount(newAmount);
            setVoucherSuccess("Discount applied!");
            const res = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    amount: convertToSubcurrency(newAmount),
                    screeningId,
                    tickets,
                    guestEmail,
                    voucherCode,
                }),
            });
            const data = await res.json();
            setClientSecret(data.clientSecret);

        } catch (err) {
            console.error(err);
            setVoucherError("Error applying voucher");
        } finally {
            setVoucherLoading(false);
        }


    }

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
                <Label>Add voucher</Label>
                <div className="flex gap-2 mb-2">

                    <Input
                        type="text"
                        placeholder="Voucher code"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className="border p-2 rounded flex-1"
                    />
                    <Button
                        disabled={voucherLoading || !voucherCode}
                        onClick={applyVoucher}
                        className="cursor-pointer"
                        variant="outline"
                    >
                        {voucherLoading ? "Applying..." : "Apply"}
                    </Button>

                </div>
                {voucherError && (<p className="text-sm text-red-500">{voucherError}</p>)}
                {voucherSuccess && (<p className="text-sm text-green-500">{voucherSuccess}</p>)}
                {clientSecret ?<div> <PaymentElement
                options={{
                    layout:"accordion"
                }}/>
                    <Button  disabled={loading} className="my-button button-glow my-5 w-full!">
                        {loading ? <BeatLoader color={"#EDEDED"} speedMultiplier={0.5}/> : `Pay ${finalAmount}€`}

                    </Button>

                </div>:<CircleLoader color={"#FF7675"}/>
                }
                {error && <div>{error}</div>}

            </form>
        </div>
    )
}
export default CheckoutPage
