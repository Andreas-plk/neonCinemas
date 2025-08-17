import MovieCard from "@/components/MovieCard";
import {dummyShowsData,genresData} from "@/assets/assets";
const Page =async () => {

    const data=await fetch("https://api.themoviedb.org/3/movie/359724",
        {method: "GET",
        headers:{
            Authorization:"Bearer " + process.env.TMDB_ACCESS_TOKEN},
        })
    const json=await data.json();
    const movies = json.results;
    // await movies.forEach(movie => {
    //     movie.genre_ids.forEach(genre => {
    //         genresData.genres.forEach(i => {
    //             if(i.id===genre){
    //                 movie.genres=movie.genre_ids.filter(item=>item !== i.id);
    //                 movie.genre_ids.push(i);
    //             }
    //         })
    //     })
    // })

    return (
        <section className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
            <h1 className="my-8 mx-3 text-center md:text-start font-semibold text-3xl">Playing now</h1>
            <div className="flex flex-wrap max-sm:justify-center gap-8 my-8">
            {/*{movies.map((item) => (*/}
                <MovieCard movie={json} key={json.id} />
            {/*))}*/}
        </div></section>


    )
}
export default Page
