import {NextRequest, NextResponse} from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";
const OPTIONS = {
    method: "GET",
    headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
};

export async function GET(req: NextRequest,{params}:{params:{id: number}})  {
    try {
        const { id } = await params;
        const res = await fetch(`${BASE_URL}/movie/${id}/reviews`, OPTIONS);

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to fetch reviews" },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}