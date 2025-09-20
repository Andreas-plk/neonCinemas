import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import {Genre} from "@/types/types";
import {Trailer} from "@prisma/client";
import { addDays, isAfter } from "date-fns";

const BASE_URL = "https://api.themoviedb.org/3";
const OPTIONS = {
    method: "GET",
    headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
};
export async function POST(req: NextRequest) {
    try {
        const { tmdbId ,cinemasSchedule} = await req.json();
        let movie = await prisma.movie.findFirst({where: {tmdbId}});
        if (!movie) {

            // Fetch movie details
            const movieRes = await fetch(`${BASE_URL}/movie/${tmdbId}`, OPTIONS);
            if (!movieRes.ok) throw new Error("Movie fetch failed");
            const movieData = await movieRes.json();
            console.log(movieData);

            // Fetch videos
            const videoRes = await fetch(`${BASE_URL}/movie/${tmdbId}/videos`, OPTIONS);
            const videoData = await videoRes.json();

            const trailerData = videoData.results.find(
                (v: Trailer) => v.type === "Trailer" && v.site === "YouTube"
            );
            // console.log(trailerData);


            // Create movie
            movie = await prisma.movie.create({
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
                    playingNow: true,
                    genres: {
                        connectOrCreate: movieData.genres.map((g: Genre) => ({
                            where: {id: g.id},         // ψάχνει αν υπάρχει
                            create: {id: g.id, name: g.name} // αν δεν υπάρχει, δημιουργεί
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
        }

        const screeningsToCreate = [];

        for (const cinema of cinemasSchedule) {
            const start = new Date(cinema.startDate);
            const end = new Date(cinema.endDate);

            let current = new Date(start);

            while (!isAfter(current, end)) {
                const weekday = current.getDay(); // επιστρέφει την μέρα από την ημερωμηνία ως αριθμό (0 κυριακή κλπ)
                const dayConfig = cinema.days.find((d: any) => d.weekday === weekday);

                if (dayConfig) {
                    for (const screening of dayConfig.screenings) {
                        const [hours, minutes] = screening.time.split(":").map(Number);
                        const screeningTime = new Date(current);
                        screeningTime.setHours(hours, minutes, 0, 0);

                        screeningsToCreate.push({
                            time: screeningTime,
                            movieId: movie.Id,
                            cinemaId: cinema.cinemaId,
                            roomId: screening.roomId,
                        });
                    }
                }

                current = addDays(current, 1);
            }
        }

        if (screeningsToCreate.length === 0) {
            return NextResponse.json({ error: "No screenings to create" }, { status: 400 });
        }

        const created = await prisma.screening.createMany({
            data: screeningsToCreate,
            skipDuplicates: true,
        });

        return NextResponse.json({ success: true, created });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: {err} }, { status: 500 });
    }
}
