import {genresData} from "@/assets/assets";
import ImportButton from "@/components/importButton";
import {tmdbMovie} from '@/types/types'
import DialogButton from "@/components/DialogButton";


const NewMovie = ({movie}:{movie:tmdbMovie}) => {
    return (
        <div className="movie-card">
                    <img src={movie.backdrop_path!==null ?(`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`):("/posterNotFound.png")} alt="Movie cover"
                     className="object-cover object-right-bottom cursor-pointer h-52 w-auto rounded-md"/>
            <p className="flex flex-col justify-between items-center my-2"> {movie.title}</p>
            <div className="flex flex-col-2 w-full justify-between  text-xs text-text/80 mb-3">
                <p>
                    {movie.release_date && new Date(movie.release_date).getFullYear()} • {movie.genre_ids?.map(id => genresData[id]).join(" • ")}
                </p>



            </div>
            <div className="flex w-full justify-center items-center text-sm text-text/80 mb-3 ">
                {/*<ImportButton tmdbId={movie.id}/>*/}
                <DialogButton tmdbId={movie.id}/>
            </div>

        </div>
    )
}
export default NewMovie
