"use client"
import  {useState} from 'react'

import {toast} from "sonner"
import { MdEventSeat } from "react-icons/md";
import {AnimatePresence, motion} from "motion/react";
import SeatSelection from "@/components/SeatSelection";
const CinemaSeats = ({rows,seatsPerRow,sections,screeningId}:{rows:number,seatsPerRow:number,sections:number,screeningId:number}) => {
    const variants = {
        rest: { },
        hover: { },
    };

    const seatOverflow=(index:number)=>(
        index<=25?(index):(index+6)
    )
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])

    const getSeat=(row:string,num:number)=>{
       return  row+num.toString();
    }



    const addSeat=(seat:string)=>{

        setSelectedSeats((prev) => {
            if (prev.includes(seat)) {
                return prev.filter((s) => s !== seat); // αφαίρεση
            } else {
                if (prev.length>=9){
                    toast("You can't select more than 9 seats",{
                        action:{
                            label:"X",
                            onClick:()=>console.log("X")
                        }
                    })
                    return[...prev];
                }
                return [...prev, seat]; // προσθήκη
            }

        });
     }




    const renderSection = (sectionIndex:number) => {
        return(<div key={sectionIndex} className="mx-1 md:mx-10 w-fit">
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
        <div className="w-full flex flex-col md:flex-row justify-start overflow-hidden">
            <div className=" w-full md:w-3/4  w-max-6xl px-2 md:px-10">
                <div
                    className="flex md:justify-center gap-6 overflow-x-auto md:overflow-visible">
                    {Array.from({ length: sections }, (_, sectionIndex) => renderSection(sectionIndex))}
                </div>
            </div>
            <div className="flex flex-col mt-4 md:mt-0 justify-center items-center md:justify-start gap-4 w-full md:w-1/4">
                <h1 className="text-2xl font-semibold uppercase">Tickets</h1>
                <AnimatePresence>
                    {selectedSeats.length === 0 ? (
                        <motion.p
                            layout
                            transition={{ layout: { duration: 0.3 }}}
                            initial={{x:-60,opacity:0}}
                            animate={{x:0,opacity:0.7}}
                            exit={{x:-60,opacity:0}}
                            className="text-sm italic">No selected seats yet.</motion.p>
                    ) : (
                        selectedSeats.map((seat: string) => (
                            <SeatSelection key={seat} seat={seat} />
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
export default CinemaSeats
