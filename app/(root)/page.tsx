import React from 'react'
import MovieCard from "@/components/MovieCard";
import {dummyShowsData} from "@/assets/assets";
const Page =async () => {

    return (
        <section className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
            <h1 className="my-8 mx-3 text-center md:text-start font-semibold text-3xl">Playing now</h1>
            <div className="flex flex-wrap max-sm:justify-center gap-8 my-8">
            {dummyShowsData.map((item) => (
                <MovieCard movie={item} key={item._id} />
            ))}
        </div></section>


    )
}
export default Page
