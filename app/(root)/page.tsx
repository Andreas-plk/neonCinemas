import MovieCard from "@/components/MovieCard";
import {getMovies} from "@/app/actions";
import PlayingNow from "@/components/PlayingNow";
const Page = async () => {
    const movies = await getMovies() ;
    return ( <section className="px-6 md:px16 lg:px-24 xl:px-44 overflow-hidden">
        <h1 className="my-8 mx-3 text-center md:text-start font-semibold text-3xl">
            Top 10 Trending movies
        </h1>
        <div className="flex gap-6 overflow-x-auto px-5 pb-4 scrollbar-hide shadow-2xl shadow-primer/25"> {
            movies ? (movies.slice()
                    .sort((a,b)=>b.bookingCount - a.bookingCount)
                    .slice(0, 10)
                    .map((item) =>

                    (<div key={item.Id} className="flex-shrink-0 w-66 h-100">
                        <MovieCard movie={item}  />
                    </div>) ))
                :
                <p>No movies playing now</p>}
        </div>
        <PlayingNow movies={movies} />
    </section> )
}
export default Page