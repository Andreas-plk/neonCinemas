'use client'
import React from 'react'
import CinemaSeats from "@/components/CinemaSeats";
import {useParams} from "next/navigation";

const Page = () => {
    const params= useParams();
    const screeningId= Number(params.screeningId);
    const id= String(params.id);
    return (
        <div className="m-3 md:m-7 p-1">
            <h1 className="uppercase font-semibold text-center text-3xl">select seats</h1>
            <div className="flex flex-col items-center mb-9 w-full md:w-3/4">
                <svg viewBox="0 0 300 50" className=" w-[400] md:w-[1000px] md:h-[90px]" preserveAspectRatio="none">
                    <path d="M 0 50 Q 150 0 300 50" stroke="#D4A373" fill="none" strokeWidth="4" />
                </svg>
                <span className="text-sm uppercase text-text/70 mt-1">screen</span>
            </div>
            <CinemaSeats rows={15} seatsPerRow={8} sections={2} screeningId={screeningId} id={id}/>
          </div>
    )
}
export default Page
