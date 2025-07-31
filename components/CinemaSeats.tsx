"use client"
import React, {useEffect} from 'react'

import { MdEventSeat } from "react-icons/md";
import {motion} from "motion/react";
const CinemaSeats = ({rows,seatsPerRow,sections,screeningId}:{rows:number,seatsPerRow:number,sections:number,screeningId:number}) => {
    const variants = {
        rest: { },
        hover: { },
    };

    const seatOverflow=(index:number)=>(
        index<=25?(index):(index+6)
    )
    const [selectedSeats, setSelectedSeats] = React.useState<string[]>([])

    const getSeat=(row:string,num:number)=>{
       return  row+num.toString();
    }



    const addSeat=(seat:string)=>{
        setSelectedSeats((prev) => {
            if (prev.includes(seat)) {
                return prev.filter((s) => s !== seat); // αφαίρεση
            } else {
                return [...prev, seat]; // προσθήκη
            }

        });
     }

    useEffect(()=>{ console.log("Selected seats:", selectedSeats);},[selectedSeats])



    const renderSection = (sectionIndex:number) => {
        return(<div key={sectionIndex} className="mx-1 md:mx-10">
            {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-2">
                {Array.from({ length: seatsPerRow }, (_, seatIndex) => (
                    <motion.button
                        key={seatIndex}
                        className={`input-button !w-7 !h-7 p-0 flex items-center justify-center relative mx-1 md:mx-2
                         ${selectedSeats.includes(getSeat(String.fromCharCode(65 + seatOverflow(rowIndex)),seatIndex + 1+(seatsPerRow*sectionIndex)))?"!bg-second":""}`}
                        variants={variants}
                        initial="rest"
                        whileHover={!selectedSeats.includes(getSeat(String.fromCharCode(65 + seatOverflow(rowIndex)),seatIndex + 1+(seatsPerRow*sectionIndex))) ? "hover" : undefined}
                        onClick={() => {addSeat(getSeat(String.fromCharCode(65 + seatOverflow(rowIndex)),seatIndex + 1+(seatsPerRow*sectionIndex)))}}
                    >
                        {!selectedSeats.includes(getSeat(String.fromCharCode(65 + seatOverflow(rowIndex)),seatIndex + 1+(seatsPerRow*sectionIndex))) &&<motion.div
                            className='absolute'
                            variants={{
                                rest: {opacity: 1, y: 0},
                                hover: {opacity: 0, y: 20, scale: 0}
                            }}
                            transition={{duration: 0.4}}>
                            <MdEventSeat className='size-6'/>
                        </motion.div>}

                        <motion.a
                        className='absolute text-xs md:text-md'
                        animate={selectedSeats.includes(getSeat(String.fromCharCode(65 + seatOverflow(rowIndex)),seatIndex + 1+(seatsPerRow*sectionIndex))) ? 'hover' : undefined}
                        variants={{
                            rest: { opacity: 0, y: -20 },
                            hover: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}>
                            {String.fromCharCode(65 + seatOverflow(rowIndex))}
                            {seatIndex + 1+(seatsPerRow*sectionIndex)}
                        </motion.a>


                    </motion.button>
                ))}
            </div>
        ))}
            </div>
)};


    return (
        <div className="m-4">
            <div className="flex justify-center flex-row flex-wrap gap-8">
            {Array.from({ length: sections }, (_, sectionIndex) => renderSection(sectionIndex))}
            </div>
        </div>
    )
}
export default CinemaSeats
