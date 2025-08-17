import {MinToHours} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
const MovieCard = ({movie}) => {
    return (
        <div className="movie-card">
            <Link href={`/movie/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="Movie cover"
                       className="object-cover object-right-bottom cursor-pointer h-52 w-auto rounded-md"/></Link>
            <p className="flex flex-col justify-between items-center my-2"> {movie.title}</p>
            <div className="flex flex-col-2 w-full justify-between  text-xs text-text/80 mb-3">
                <p>
                    {new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0,2).map(genre=> genre.name).join(" • ")}
                </p>
                <p>
                    {MinToHours(movie.runtime)}
                </p>


            </div>
            <div className="flex flex-col-2 w-full justify-between items-center text-sm text-text/80 mb-3">
                <Button className="button-glow my-button "><Link href={`/movie/${movie.id}`}>Buy tickets</Link></Button>
                <p className="flex"><FaStar className="size-4.5 text-second"/> {movie.vote_average.toFixed(1)}</p>
            </div>

        </div>
    )
}
export default MovieCard
