"use client"
import React, {useEffect, useState} from 'react'
import {dummyDateTimeData, dummyShowsData } from "@/assets/assets";
import {useParams} from "next/navigation";
import { FaStar,FaClock,  } from "react-icons/fa";
import { MdFavorite,MdFavoriteBorder } from "react-icons/md";
import {MinToHours} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import VideoPlayerButton from "@/components/VideoPlayerButton";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from 'motion/react';
import WeekDays from "@/components/WeekDays";
import Link from "next/link";

type ShowType = {
    movie: typeof dummyShowsData[number];
    dateTime: typeof dummyDateTimeData;
};

const Page = () => {
    const {id} = useParams();
    const [show, setShow] = useState<ShowType | null>(null);
    const [favorite, setFavorite] = useState(false);
    const getShow = async () => {
        const movie = dummyShowsData.find(show => show._id === id);
        if (!movie) return;
        setShow({
            movie,
            dateTime:dummyDateTimeData
        });
    }
    const scrollToTickets = () => {
        const element = document.getElementById('tickets');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        getShow();
    }, [id])

    return show ?(
        <>
        <div className="px-6 md:px-16 lg:px-40 py-10 md:py-30 justify-between flex flex-col ">
            <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                <div className="relative flex flex-col gap-3">

                    <h1 className="text-4xl font-semibold max-w-96 text-balance uppercase">{show.movie.title}</h1>
                    <p className="text-text/70">{show.movie.original_language}</p>
                    <div className="flex items-center gap-2">
                        User Rating :<FaStar className="size-4.5 text-second"/> {show.movie.vote_average.toFixed(1)}
                    </div>
                    <p className="mt-2 text-sm leading-tight max-w-xl">{show.movie.overview}</p>
                    <div className="flex flex-col-2 w-full justify-between  text-xs text-text/80 mb-3">
                        <p>
                            {new Date(show.movie.release_date).getFullYear()} • {show.movie.genres.map(genre=> genre.name).join(" • ")}
                        </p>
                        <p className="flex">
                            <FaClock className="size-4 text-second"/>{MinToHours(show.movie.runtime)}
                        </p>


                    </div>
                    <div className="flex flex-col md:flex-row justify-start items-center  gap-7">
                        <VideoPlayerButton/>
                        <Button onClick={()=>scrollToTickets()} className="my-button button-glow !w-[150]">Buy tickets</Button>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0.9 }}
                            animate={{color:favorite ? "#FF7675" : "#EDEDED"}}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => setFavorite(!favorite)}
                        >
                              {favorite ? (

                                  <Tooltip>
                                      <TooltipTrigger><MdFavorite
                                          key="filled"
                                          className="size-10  cursor-pointer "
                                      /></TooltipTrigger>
                                      <TooltipContent>
                                          <p>Remove from Favorites</p>
                                      </TooltipContent>
                                  </Tooltip>
                              ) : (
                                  <Tooltip>
                                      <TooltipTrigger><MdFavoriteBorder
                                          key="outline"
                                          className="size-10 cursor-pointer "
                                      /></TooltipTrigger>
                                      <TooltipContent>
                                          <p>Add to Favorites</p>
                                      </TooltipContent>
                                  </Tooltip>

                              )}
                        </motion.div>

                    </div>


                </div>


                <img src={show.movie.poster_path} alt="Movie cover"  className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover shadow shadow-2xl" />
            </div>
            <div id="tickets">
                    <WeekDays dateTime={show.dateTime} id={id}/>
            </div>





        </div>

            </>
    ):(
        <div>
            Loading...
        </div>
    )
}
export default Page
