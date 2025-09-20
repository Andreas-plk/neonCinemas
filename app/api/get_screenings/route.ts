import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const Id = searchParams.get("id");

    if (!Id) {
        return NextResponse.json({ error: "Missing Id" }, { status: 400 });
    }

    const screenings = await prisma.screening.findMany({
        where: {
            movie: { Id },
            isActive: true,
        },
        include: {
            room: true,
            cinema: true,
        },
        orderBy: {
            time: "asc",
        },
    });
    if (screenings.length === 0) {
        return NextResponse.json([]);
    }
    return NextResponse.json(screenings);
}
