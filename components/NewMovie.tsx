import {Button} from "@/components/ui/button";
import Link from "next/link";
import {genresData} from "@/assets/assets";
import ImportButton from "@/components/importButton";



const NewMovie = ({movie}) => {
    return (
        <div className="movie-card">
            <Link href={`/movie/${movie.id}`}>
                <img src={movie.backdrop_path!==null ?(`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`):("/posterNotFound.png")} alt="Movie cover"
                     className="object-cover object-right-bottom cursor-pointer h-52 w-auto rounded-md"/>
            </Link>
            <p className="flex flex-col justify-between items-center my-2"> {movie.title}</p>
            <div className="flex flex-col-2 w-full justify-between  text-xs text-text/80 mb-3">
                <p>
                    {new Date(movie.release_date).getFullYear()} • {movie.genre_ids.map(id => genresData[id]).join(" • ")}
                </p>



            </div>
            <div className="flex flex-col-2 w-full justify-between items-center text-sm text-text/80 mb-3">
                <ImportButton tmdbId={movie.id}></ImportButton>
            </div>

        </div>
    )
}
export default NewMovie
