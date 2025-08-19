'use client'
import SearchField from "@/components/SearchField";
import {useEffect, useState} from "react";
import {useDebounce} from "react-use";
import NewMovie from "@/components/NewMovie";
import {tmdbMovie} from '@/types/types'

const BASE_URL="https://api.themoviedb.org/3/";
const OPTIONS = {method: "GET",
    headers:{
        Authorization:"Bearer " + process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN},
}

const Page = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    useDebounce(()=>setDebouncedSearchTerm(searchTerm),1000,[searchTerm])

    const fetchMovies = async (query='') => {
        setLoading(true)
        try {
            const endpoint=query?
                `${BASE_URL}search/movie?query=${encodeURIComponent(query)}`
                :
                `${BASE_URL}discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint,OPTIONS);

            if (!response.ok) {
                throw new Error("Could not fetch movies");
            }
            const data=await response.json();
            if (!!data.Response) {
                setError(data.Error || 'failed to fetch movies');
                setMovies([]);
                return;
            }
            setMovies(data.results||[]);
            console.log(movies);
        }catch (error) {
            console.log(error);
            setError("Error fetching movies.Please try again later");

        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    },[debouncedSearchTerm])



    return (
        <div className="flex flex-col justify-center items-center  " >
            <h1 className="text-5xl">Search for movies to add </h1>

            <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <div >
            {loading?(<p>Loading...</p>)
                :error ?(<p className="text-red-500">{error}</p>)
            :(<div className="flex flex-wrap justify-center gap-8 my-8">
                        {movies.map((item:tmdbMovie) => (
                        <NewMovie movie={item} key={item.id} />
                        ))}
                    </div>)}

            </div>
        </div>
    )
}
export default Page
