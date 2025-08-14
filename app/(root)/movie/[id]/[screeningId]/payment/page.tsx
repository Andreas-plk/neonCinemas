'use client';
import { useTickets } from "@/context/TicketContext";
import {redirect} from "next/navigation";

const Page = () => {
    const { tickets } = useTickets();
    if (tickets.length===0)redirect('/') ;
    return (
        <div>
            <h1>your tickets</h1>
            <div>
                {tickets.map((t,i) =>(
                    <h1 key={i}> Seat : {t.seat} Type : {t.type}</h1>
                ))}
            </div>
        </div>
    )
}
export default Page
