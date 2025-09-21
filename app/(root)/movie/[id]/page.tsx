"use client"
import React, {useEffect, useState} from 'react'
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
import {Movie} from "@/types/types"


const Page =   () => {
    const {id} = useParams();
    const [movie, setMovie] = useState<Movie|null>(null);
    const [favorite, setFavorite] = useState(false);
    const scrollToTickets = () => {
        const element = document.getElementById('tickets');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        fetch(`/api/get_movie/${id}`,{
            method: "GET",
            headers:{
                accept: "application/json",
            }
        })
            .then(res => res.json())
            .then(setMovie)

    }, [id])

    return movie ?(

        <>
        <div className="px-6 md:px-16 lg:px-40 py-10 md:py-30 justify-between flex flex-col ">
            <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                <div className="relative flex flex-col gap-3">

                    <h1 className="text-4xl font-semibold max-w-96 text-balance uppercase">{movie.title}</h1>
                    <p className="text-text/70 uppercase">{movie.originalLanguage}</p>
                    <div className="flex items-center gap-2">
                        User Rating :<FaStar className="size-4.5 text-second"/> {movie.voteAverage?.toFixed(1)}
                    </div>
                    <p className="mt-2 text-sm leading-tight max-w-xl">{movie.overview}</p>
                    <div className="flex flex-col-2 w-full justify-between  text-xs text-text/80 mb-3">
                        <p>
                            {movie.releaseDate && new Date(movie.releaseDate).getFullYear()} • {movie.genres.map(genre=> genre.name).join(" • ")}
                        </p>
                        <p className="flex">
                            <FaClock className="size-4 text-second"/>{movie.runtime && MinToHours(movie.runtime)}
                        </p>


                    </div>
                    <div className="flex flex-col md:flex-row justify-start items-center  gap-7">
                        {movie.trailer?.key ?(<VideoPlayerButton url={movie.trailer.key }/>):<p>No trailer</p>}

                        <Button onClick={()=>scrollToTickets()} className="my-button button-glow !w-[150]">Buy tickets</Button>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0.9 }}
                            animate={{color:favorite ? "#FF7675" : "#EDEDED"}}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => setFavorite(!favorite)}
                        >
                              {/*{favorite ? (*/}

                              {/*    <Tooltip>*/}
                              {/*        <TooltipTrigger><MdFavorite*/}
                              {/*            key="filled"*/}
                              {/*            className="size-10  cursor-pointer "*/}
                              {/*        /></TooltipTrigger>*/}
                              {/*        <TooltipContent>*/}
                              {/*            <p>Remove from Favorites</p>*/}
                              {/*        </TooltipContent>*/}
                              {/*    </Tooltip>*/}
                              {/*) : (*/}
                              {/*    <Tooltip>*/}
                              {/*        <TooltipTrigger><MdFavoriteBorder*/}
                              {/*            key="outline"*/}
                              {/*            className="size-10 cursor-pointer "*/}
                              {/*        /></TooltipTrigger>*/}
                              {/*        <TooltipContent>*/}
                              {/*            <p>Add to Favorites</p>*/}
                              {/*        </TooltipContent>*/}
                              {/*    </Tooltip>*/}

                              {/*)}*/}
                        </motion.div>

                    </div>


                </div>


                <img src={movie.posterPath ?`https://image.tmdb.org/t/p/original/${movie.posterPath}` :"/posterNotFound.png" } alt="Movie cover"  className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover shadow-xl/50" />
            </div>
            <div id="tickets">
                    <WeekDays/>
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
