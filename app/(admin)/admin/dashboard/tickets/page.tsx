import {getTickets, updateTicket} from "@/app/actions";
import {formatPrice} from "@/lib/utils";
import{Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


const Page = async () => {
    const tickets= await getTickets()


    if(!tickets){
        return (<div>Error fetching tickets</div>)
    }



return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold">Ticket prices</h2>

        {tickets.map((ticket: any) => (
            <form
                key={ticket.seatType}
                action={updateTicket}
                className="flex items-center gap-3 bg-second/20 p-3 rounded-md"
            >
                <input type="hidden" name="seatType" value={ticket.seatType} />

                <div className="w-36">
                    <Label className="text-sm">{ticket.seatType}</Label>
                    <div className="text-xs text-muted-foreground">
                        {formatPrice(ticket.value)}
                    </div>
                </div>

                <div className="flex-1">
                    <Label className="sr-only">New value</Label>
                    <Input
                        name="value"
                        defaultValue={ticket.value.toString()}
                        type="number"
                        step="0.1"
                        className="w-full"
                    />
                </div>

                <Button type="submit" className="my-button button-glow">
                    Update
                </Button>
            </form>
        ))}
    </div>
);
}

export default Page
