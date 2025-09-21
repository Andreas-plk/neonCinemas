// prisma/seed.ts
import prisma from "@/prisma";



async function main() {
    const cinemasData = [
        {
            name: "Athens Mall",
            location: "Ανδρέα Παπανδρέου 35, Μαρούσι, Αθήνα",
            rooms: [
                { name: "Room 1", rows: 10, seatsPerRow: 14, sections: 1 },
                { name: "Room 2", rows: 12, seatsPerRow: 8, sections: 2 },
                { name: "Room 3", rows: 15, seatsPerRow: 8, sections: 2 },
                { name: "IMAX", rows: 20, seatsPerRow: 15, sections: 1 },
            ],
        },
        {
            name: "Thessaloniki Center",
            location: "26ης Οκτωβρίου 21, Θεσσαλονίκη",
            rooms: [
                { name: "Room 1", rows: 10, seatsPerRow: 12, sections: 1 },
                { name: "Room 2", rows: 12, seatsPerRow: 8, sections: 2 },
                { name: "Room 3", rows: 14, seatsPerRow: 7, sections: 2 },
                { name: "Room 4", rows: 10, seatsPerRow: 12, sections: 1 },
            ],
        },
        {
            name: "Patras Riviera",
            location: "Νέα Εθνική Οδός Πατρών – Αθηνών 65, Πάτρα",
            rooms: [
                { name: "Room 1", rows: 14, seatsPerRow: 12, sections: 1 },
                { name: "Room 2", rows: 12, seatsPerRow: 8, sections: 2 },
                { name: "Room 3", rows: 12, seatsPerRow: 8, sections: 2 },
            ],
        },
        {
            name: "Heraklion Plaza",
            location: "Λεωφόρος Ικάρου 93, Ηράκλειο Κρήτης",
            rooms: [
                { name: "Room 1", rows: 12, seatsPerRow: 10, sections: 1 },
                { name: "Room 2", rows: 12, seatsPerRow: 8, sections: 2 },
                { name: "Room 3", rows: 12, seatsPerRow: 8, sections: 2 },
                { name: "Room 4", rows: 10, seatsPerRow: 10, sections: 1 },
            ],
        },
        {
            name: "Volos Port",
            location: "Δημητριάδος 215, Βόλος",
            rooms: [
                { name: "Room 1", rows: 8, seatsPerRow: 10, sections: 1 },
                { name: "Room 2", rows: 14, seatsPerRow: 7, sections: 2 },
                { name: "Room 3", rows: 14, seatsPerRow: 7, sections: 2 },
            ],
        },
        {
            name: "Larissa Park",
            location: "Φιλελλήνων 14, Λάρισα",
            rooms: [
                { name: "Room 1", rows: 12, seatsPerRow: 11, sections: 1 },
                { name: "Room 2", rows: 12, seatsPerRow: 7, sections: 2 },
                { name: "Room 3", rows: 12, seatsPerRow: 7, sections: 2 },
            ],
        },
        {
            name: "Rhodes Palace",
            location: "Λεωφόρος Δημοκρατίας 45, Ρόδος",
            rooms: [
                { name: "Room 1", rows: 12, seatsPerRow: 6, sections: 2 },
                { name: "Room 2", rows: 12, seatsPerRow: 6, sections: 2 },

            ],
        },
    ];

    for (const cinema of cinemasData) {
        const createdCinema = await prisma.cinema.create({
            data: {
                name: cinema.name,
                location: cinema.location,
            },
        });

        await prisma.room.createMany({
            data: cinema.rooms.map((room) => ({
                ...room,
                cinemaId: createdCinema.id,
            })),
        });
    }

    console.log("✅ Cinemas & Rooms seeded successfully with variations!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
