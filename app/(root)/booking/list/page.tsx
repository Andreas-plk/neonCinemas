import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {getUserBookings} from "@/app/actions";
import BookingsTable from "@/components/BookingsTable";

const Page = async () => {
    const session= await auth();
    if (!session?.user?.email) {
        redirect('/')
    }
    const bookings= await getUserBookings(session?.user?.email);

    if (bookings.length === 0) {
        return <p className="flex items-center justify-center h-svh text-2xl">No bookings found.</p>;
    }

    return (
        <div className="px-6 p-2 md:px16 lg:px-24 xl:px-44 overflow-hidden">
            <BookingsTable bookings={bookings} />
        </div>
    )
}
export default Page
