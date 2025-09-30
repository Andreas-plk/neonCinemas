import {getCinemaInfo} from "@/app/actions";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {CinemaMapButton} from "@/components/CinemaMapButton";


const Page = async () => {
    const cinemas = await getCinemaInfo()
    return (
        <div className="max-w-6xl mx-auto p-8 space-y-8">
            <h1 className="text-4xl font-bold text-center mb-6">About Neon Cinemas</h1>
            <p className="text-lg text-center">
                Welcome to Neon Cinemas! We offer a premium movie-going experience with modern rooms and flexible ticket prices.
            </p>

            {cinemas.map((cinema) => (
                <Card key={cinema.id}>
                    <CardHeader>
                        <CardTitle>{cinema.name}</CardTitle>
                        <CardDescription>Location: {cinema.location}<br/><CinemaMapButton address={cinema.location} /></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Rooms</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cinema.rooms.map((room) => (
                                    <Card key={room.id}>
                                        <CardHeader>
                                            <CardTitle>{room.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Total seats : {room.sections*room.seatsPerRow*room.rows}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">Ticket Prices</h3>
                            <div className="flex flex-wrap gap-4">
                                {cinema.prices.map((price,idx) => (
                                    <div key={idx}>
                                        {price.seatType}
                                        <p>{price.value.toFixed(2)}€</p>

                                    </div>
                                ))}
                            </div>
                        </div>

                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
export default Page
