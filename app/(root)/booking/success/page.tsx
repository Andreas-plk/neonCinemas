
import {getBooking} from "@/app/actions";
import BookingCard from "@/components/BookingCard";

interface PageProps {
    searchParams: { payment_intent?: string };
}
const Page = async ({ searchParams }: PageProps) => {

    const params =await searchParams;
    const {payment_intent}=params;
    const fetchBookingWithRetry = async (payment_intent: string, retries = 5, delay = 500) => {
        for (let i = 0; i < retries; i++) {
            const booking = await getBooking(payment_intent);
            if (booking) return booking;
            await new Promise((r) => setTimeout(r, delay));
        }
        return null;
    };
    let booking;
    if(payment_intent){
        try {
            booking= await fetchBookingWithRetry(payment_intent)
        }catch(error){
            console.log(error);
        }

    }

    if (!booking)return (<div>something is wrong</div>)
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <BookingCard booking={booking}/>
        </div>
    );
};

export default Page
