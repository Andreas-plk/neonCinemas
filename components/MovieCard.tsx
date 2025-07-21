import React from 'react'

const MovieCard = ({movie}:{movie:any}) => {
    return (
        <div className="movie-card">
            <img src={movie.backdrop_path} alt="Movie cover"  
                 className="object-cover object-right-bottom cursor-pointer h-52 w-auto"/>
            <div className="flex flex-col justify-between items-center"> {movie.title}</div>
        </div>
    )
}
export default MovieCard
