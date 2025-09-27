import MovieCard from "@/components/MovieCard";
import {getMovies} from "@/app/actions";
const Page = async () => {
    const movies = await getMovies() ;
    return ( <section className="px-6 md:px16 lg:px-24 xl:px-44 overflow-hidden">
        <h1 className="my-8 mx-3 text-center md:text-start font-semibold text-3xl">
            Playing now
        </h1>
        <div className="flex flex-wrap justify-center gap-8 my-8 "> {
            movies ? (movies.map((item) =>
                (<MovieCard movie={item} key={item.Id} />) ))
                :
                <p>No movies playing now</p>}
        </div>
    </section> )
}
export default Page