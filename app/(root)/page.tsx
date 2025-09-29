import MovieCard from "@/components/MovieCard";
import {getMovies} from "@/app/actions";
const Page = async () => {
    const movies = await getMovies() ;
    return ( <section className="px-6 md:px16 lg:px-24 xl:px-44 overflow-hidden">
        <h1 className="my-8 mx-3 text-center md:text-start font-semibold text-3xl">
            Trending now
        </h1>
        <div className="flex gap-6 overflow-x-auto px-5 pb-4 scrollbar-hide shadow-2xl shadow-primer/25"> {
            movies ? (movies.slice()
                    .sort((a,b)=>b.bookingCount - a.bookingCount)
                    .map((item) =>

                    (<div key={item.Id} className="flex-shrink-0 w-66 h-100">
                        <MovieCard movie={item}  />
                    </div>) ))
                :
                <p>No movies playing now</p>}
        </div>
        <h1 className="my-8 mx-3 text-center md:text-start font-semibold text-3xl">
            Playing now
        </h1>
        <div className="flex flex-wrap justify-center gap-8 my-8"> {
            movies ? (movies.map((item) =>
                (<MovieCard movie={item} key={item.Id} />) ))
                :
                <p>No movies playing now</p>}
        </div>
    </section> )
}
export default Page