import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import {Genre} from "@/types/types";

const BASE_URL = "https://api.themoviedb.org/3";
const OPTIONS = {
    method: "GET",
    headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
};
export async function POST(req: NextRequest) {
    try {
        const { tmdbId } = await req.json();

        // Fetch movie details
        const movieRes = await fetch(`${BASE_URL}/movie/${tmdbId}`, OPTIONS);
        if (!movieRes.ok) throw new Error("Movie fetch failed");
        const movieData = await movieRes.json();
        console.log(movieData);

        // Fetch videos
        const videoRes = await fetch(`${BASE_URL}/movie/${tmdbId}/videos`, OPTIONS);
        const videoData = await videoRes.json();

        const trailerData = videoData.results.find(
            (v: any) => v.type === "Trailer" && v.site==="YouTube"
        );
        console.log(trailerData);


        // Create movie
        const movie = await prisma.movie.create({
            data: {
                tmdbId: movieData.id,
                adult: movieData.adult,
                backdropPath: movieData.backdrop_path,
                posterPath: movieData.poster_path,
                title: movieData.title,
                originalTitle: movieData.original_title,
                originalLanguage: movieData.original_language,
                overview: movieData.overview,
                releaseDate: movieData.release_date
                    ? new Date(movieData.release_date)
                    : null,
                runtime: movieData.runtime,
                status: movieData.status,
                tagline: movieData.tagline,
                popularity: movieData.popularity,
                voteAverage: movieData.vote_average,
                voteCount: movieData.vote_count,
                video: movieData.video,
                playingNow:true,
                genres: {
                    connectOrCreate: movieData.genres.map((g: Genre) => ({
                        where: { id: g.id },         // ψάχνει αν υπάρχει
                        create: { id: g.id, name: g.name } // αν δεν υπάρχει, δημιουργεί
                    }))
                },
                trailer: trailerData
                    ? {
                        create: {
                            key: trailerData.key,
                            site: trailerData.site,
                            type: trailerData.type,
                            official: trailerData.official,
                            published: trailerData.published_at
                                ? new Date(trailerData.published_at)
                                : null,
                        },
                    }
                    : undefined,
            },
        });

        return NextResponse.json({ movie });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: {err} }, { status: 500 });
    }
}
