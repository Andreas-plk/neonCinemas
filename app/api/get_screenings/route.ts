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
            time: { gte:new Date() },
        },
        include: {
            room: true,
            cinema: true,
        },
        orderBy: {
            time: "asc",
        },
        cacheStrategy: { swr: 60, ttl: 300 }
    });
    if (screenings.length === 0) {
        return NextResponse.json([]);
    }
    return NextResponse.json(screenings);
}
