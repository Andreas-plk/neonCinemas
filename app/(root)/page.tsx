import MovieCard from "@/components/MovieCard";
import {prisma} from "@/prisma";

const movies =await prisma.movie.findMany({
    where:{playingNow:true},
    include:{genres:true,
    trailer:true,}
    });

const Page = () => {



    return (
        <section className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
            <h1 className="my-8 mx-3 text-center md:text-start font-semibold text-3xl">Playing now</h1>
            <div className="flex flex-wrap max-sm:justify-center gap-8 my-8">
            {movies.map((item) =>
                (<MovieCard movie={item} key={item.Id} />)
            )}
        </div></section>


    )
}
export default Page
