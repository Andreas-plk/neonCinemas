"use client";

import { useState } from "react";
import MovieCard from "@/components/MovieCard";
import { Input } from "./ui/input";


const PlayingNow = ({movies}:{movies:any}) => {
    const [search, setSearch] = useState("");



    const filteredMovies = movies.filter((movie) =>{
        const titleMatch=movie.title.toLowerCase().includes(search.toLowerCase());
        const genresMatch = movie.genres?.some((g) =>
            g.name.toLowerCase().includes(search.toLowerCase())
        );
        return titleMatch || genresMatch;}

    );

    return (
        <section>
            <h1 className="my-8 mx-3 text-center md:text-start font-semibold text-3xl">
                Playing now
            </h1>

            {/* Search Input */}
            <div className="flex justify-center md:justify-start mb-4">
                <Input
                    type="text"
                    placeholder="Search movies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-md p-2 w-full md:w-1/3"
                />
            </div>

            <div className="flex flex-wrap gap-8 my-8 justify-center md:justify-start">
                { filteredMovies.length ? (
                    filteredMovies.map((movie) => (
                        <MovieCard movie={movie} key={movie.Id} />
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </section>
    );
};

export default PlayingNow;
