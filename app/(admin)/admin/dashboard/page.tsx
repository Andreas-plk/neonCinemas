import React from 'react'
import {getAllBookings} from "@/app/actions";
import BookingsTable from "@/components/BookingsTable";

const Page =async () => {

    const bookings = await getAllBookings();
    return (
        <div>Latest bookings
        <BookingsTable bookings={bookings} admin={true} />
        </div>
    )
}
export default Page
