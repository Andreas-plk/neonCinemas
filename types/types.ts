export type Movie = {
    Id: string;                     // cuid()
    tmdbId: number;                 // TMDB id

    adult: boolean;
    backdropPath: string | null;
    posterPath: string | null;
    title: string;
    originalTitle: string;
    originalLanguage: string;
    overview: string | null;
    releaseDate: Date | null;
    runtime: number | null;
    status: string | null;
    tagline: string | null;
    popularity: number | null;
    voteAverage: number | null;
    voteCount: number | null;
    video: boolean;

    playingNow: boolean;


    // screenings: Screening[];
     trailer: {key:string} | null;
    // reviews: Review[];
    genres: {name:string, id:number}[];
};


export type tmdbMovie = {
    id: number;

    adult: boolean;
    backdrop_path: string | null;
    poster_path: string | null;
    title: string;
    original_title: string;
    original_language: string;
    overview: string | null;
    release_date: Date | null;
    runtime: number | null;
    status: string | null;
    tagline: string | null;
    popularity: number | null;
    vote_average: number | null;
    vote_count: number | null;
    video: boolean;
    genre_ids : number[]|null;

};
 type Screening = {
    id: string;
    movieId: string;
    cinemaHallId: string;
    startTime: Date;
    endTime: Date;

};

// Trailer
 type Trailer = {
    key:string;

};

// Review
 type Review = {
    id: string;
    movieId: string;
    userId: string;
    rating: number;
    comment: string | null;
    createdAt: Date;

};

// Genre
 export type Genre = {
    id: string;
    name: string;

};
