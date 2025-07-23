import React from 'react'
import {auth} from "@/auth";
import MovieCard from "@/components/MovieCard";
import {dummyShowsData} from "@/assets/assets";
const Page =async () => {
    const session = await auth();
    return (
        <section className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
            <div className="flex flex-wrap max-sm:justify-center gap-8 my-8">
            {dummyShowsData.map((item) => (
                <MovieCard movie={item} key={item._id} />
            ))}
        </div></section>


    )
}
export default Page
