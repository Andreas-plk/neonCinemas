import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";



export async function GET(req: NextRequest ,{params}:{params:{id: string}}) {
    const {id} =  await params;
    try {
        const movie = await prisma.movie.findUnique({
            where:{Id:  id},
            include:{genres:true,
            trailer:true,},
            cacheStrategy:{ swr: 60, ttl: 300 },
        })

        return NextResponse.json(movie);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: {err} }, { status: 500 });
    }
}
