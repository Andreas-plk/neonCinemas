
import {getBooking} from "@/app/actions";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface PageProps {
    searchParams: { payment_intent?: string };
}
const Page = async ({ searchParams }: PageProps) => {

    const params =await searchParams;
    const {payment_intent}=params;

    let booking;
    if(payment_intent){
        try {
            booking= await getBooking(payment_intent)
        }catch(error){
            console.log(error);
        }

    }

    if (!booking)return (<div>something is wrong</div>)
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Booking Details</CardTitle>
                    <CardDescription>Booking ID: {booking.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p><strong>Movie:</strong> {booking.screening.movie.title}</p>
                        <p><strong>Cinema:</strong> {booking.screening.cinema.name}</p>
                        <p><strong>Date:</strong> {new Date(booking.screening.time).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {new Date(booking.screening.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</p>
                    </div>

                    {booking.user && (
                        <div>
                            <p><strong>User:</strong> {booking.user.name ?? booking.user.email}</p>
                        </div>
                    )}

                    <div>
                        <p><strong>Total Price:</strong> €{booking.totalPrice.toFixed(2)}</p>
                    </div>

                    <div>
                        <p><strong>Selected Seats:</strong></p>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Seat</TableHead>
                                    <TableHead>Type</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {booking.selectedSeats.map((seat) => (
                                    <TableRow key={seat.seat}>
                                        <TableCell>{seat.seat}</TableCell>
                                        <TableCell>{seat.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page
