    "use client"
import React, {useEffect, useState} from 'react'
import {dummyShowsData} from "@/assets/assets";
import {useParams} from "next/navigation";
import { FaStar,FaClock,FaPlayCircle  } from "react-icons/fa";
import {MinToHours} from "@/lib/utils";
    import {Button} from "@/components/ui/button";
    import VideoPlayerButton from "@/components/VideoPlayerButton";

const Page = () => {
    const {id} = useParams();
    const [show, setShow] = useState(null);
    const getShow = async () => {
        const show = dummyShowsData.find(show => show._id === id);
        setShow(show);
    }

    useEffect(() => {
        getShow();
    }, [id])

    return show ?(
        <div className="px-6 md:px-16 lg:px-40 py-10 md:py-30 justify-between flex">
            <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                <div className="relative flex flex-col gap-3">

                    <h1 className="text-4xl font-semibold max-w-96 text-balance uppercase">{show.title}</h1>
                    <p className="text-text/70">{show.original_language}</p>
                    <div className="flex items-center gap-2">
                        User Rating :<FaStar className="size-4.5 text-second"/> {show.vote_average.toFixed(1)}
                    </div>
                    <p className="mt-2 text-sm leading-tight max-w-xl">{show.overview}</p>
                    <div className="flex flex-col-2 w-full justify-between  text-xs text-text/80 mb-3">
                        <p>
                            {new Date(show.release_date).getFullYear()} • {show.genres.map(genre=> genre.name).join(" • ")}
                        </p>
                        <p className="flex">
                            <FaClock className="size-4 text-second"/>{MinToHours(show.runtime)}
                        </p>


                    </div>
                    <div className="flex flex-col md:flex-row justify-start items-center  gap-5">
                        <VideoPlayerButton/>
                        <Button className="my-button button-glow !w-[150]">Buy tickets</Button>
                    </div>


                </div>
                    <img src={show.poster_path} alt="Movie cover"  className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover shadow shadow-2xl" />

                </div>
        </div>
    ):(
        <div>
            Loading...
        </div>
    )
}
export default Page
