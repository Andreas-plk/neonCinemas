"use client"
import {useEffect, useRef, useState} from 'react'

import {toast} from "sonner"
import { MdEventSeat } from "react-icons/md";
import {AnimatePresence, motion} from "motion/react";
import SeatSelection from "@/components/SeatSelection";
import {Button} from "@/components/ui/button";
import { useTickets } from "@/context/TicketContext";
import {useRouter} from "next/navigation";
import { indexToString } from "@/lib/utils";
import {Ticket} from "@/types/types";
import {getPrice} from "@/app/actions";

const CinemaSeats = ({rows,seatsPerRow,sections,screeningId,id}:{rows:number,seatsPerRow:number,sections:number,screeningId:number,id:string}) => {
    const variants = {
        rest: { },
        hover: { },
    };
    const router = useRouter();
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])
    const { tickets, setTickets } = useTickets();
    const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([])
    const containerRef = useRef<HTMLDivElement>(null);
    const [centered, setCentered] = useState(true);

    const dummySelected=["G5","G6","K10","K11","K12","A1","S3","A2","A4"]

    useEffect(() => {
        const checkWidth = () => {
            if (!containerRef.current) return;
            const scrollWidth = containerRef.current.scrollWidth;
            const clientWidth = containerRef.current.clientWidth;
            setCentered(scrollWidth <= clientWidth);
        };
            checkWidth();
            window.addEventListener("resize", checkWidth);
            return () => window.removeEventListener("resize", checkWidth);
        }, [sections]);

    const getSeat=(row:number,num:number)=>{
       return  indexToString(row)+num.toString();
    }



    const addSeat=(seat:string)=>{

        setSelectedSeats((prev) => {
            if (prev.includes(seat)) {
                setTickets(t=> t.filter(ticket => ticket.seat !== seat));
                return prev.filter((s) => s !== seat);
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

    const updateTicketType = (seat: string, type: string) => {
        setSelectedTickets(prev => {
            const exists = prev.find(t => t.seat === seat);
            if (exists) {
                return prev.map(t => t.seat === seat ? { ...t, type } : t);
            }
            return [...prev, { seat, type }];
        });
    };

    const handleNext = async () => {
        const updatedTickets = await Promise.all(
            selectedTickets.map(async (ticket) => {
                const price = await getPrice(ticket.type);
                return {
                    ...ticket,
                    price: price,
                };
            })
        );
        setTickets(updatedTickets);

        router.push(`/movie/${id}/${screeningId}/payment`);
    };

    const renderSection = (sectionIndex:number) => {
        return(<div key={sectionIndex} className="mx-1 md:mx-10 w-fit">
            {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-2">
                {Array.from({ length: seatsPerRow }, (_, seatIndex) => (
                    <motion.button
                        key={seatIndex}
                        disabled={dummySelected.includes(getSeat(rowIndex,seatIndex + 1+(seatsPerRow*sectionIndex)))}
                        className={`input-button !w-6 !h-6 p-0 flex items-center justify-center relative mx-1 md:mx-2 
                        ${dummySelected.includes(getSeat(rowIndex,seatIndex + 1+(seatsPerRow*sectionIndex)))?"!bg-red-700" :
                            selectedSeats.includes(getSeat(rowIndex,seatIndex + 1+(seatsPerRow*sectionIndex)))?"!bg-second":""}`}

                        variants={variants}
                        initial="rest"
                        whileHover={!selectedSeats.includes(getSeat(rowIndex,seatIndex + 1+(seatsPerRow*sectionIndex))) ? "hover" : undefined}
                        onClick={() => {addSeat(getSeat(rowIndex,seatIndex + 1+(seatsPerRow*sectionIndex)))}}
                    >
                        {!selectedSeats.includes(getSeat(rowIndex,seatIndex + 1+(seatsPerRow*sectionIndex))) &&<motion.div
                            className='absolute'
                            animate={selectedSeats.includes(getSeat(rowIndex,seatIndex + 1+(seatsPerRow*sectionIndex))) ||
                            dummySelected.includes(getSeat(rowIndex,seatIndex + 1+(seatsPerRow*sectionIndex)))
                                ? 'hover' : undefined}
                            variants={{
                                rest: {opacity: 1, y: 0},
                                hover: {opacity: 0, y: 20, scale: 0}
                            }}
                            transition={{duration: 0.4}}>
                            <MdEventSeat className='size-6'/>
                        </motion.div>}

                        <motion.a
                        className='absolute text-xs md:text-md'
                        animate={selectedSeats.includes(getSeat(rowIndex,seatIndex + 1+(seatsPerRow*sectionIndex))) ||
                            dummySelected.includes(getSeat(rowIndex,seatIndex + 1+(seatsPerRow*sectionIndex)))
                            ? 'hover' : undefined}
                        variants={{
                            rest: { opacity: 0, y: -20 },
                            hover: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}>
                            {indexToString(rowIndex)}
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
            <div className="w-full md:w-3/4  max-w-6xl px-2 md:px-10">
                <div
                    ref={containerRef}
                    className={`flex gap-6 overflow-x-auto ${
                        centered ? "justify-center" : "justify-start"
                    }`}>
                    {Array.from({ length: sections }, (_, sectionIndex) => renderSection(sectionIndex))}
                </div>
            </div>
            <div className="flex flex-col mt-4 md:mt-0 justify-center items-center md:justify-start gap-4 w-full md:w-1/4">
                <div className="flex flex-col-2">
                    <h1 className="text-2xl font-semibold uppercase mr-6">Tickets</h1>
                    <Button
                    className="my-button button-glow"
                    disabled={selectedTickets.length === 0 || selectedTickets.length !== selectedSeats.length}
                    onClick={handleNext}>
                        PAY
                    </Button>
                </div>

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
                            <SeatSelection key={seat} seat={seat}  onTicketChange={(type) => updateTicketType(seat, type)}/>
                        ))
                    )}
                </AnimatePresence>

            </div>
        </div>
    )
}
export default CinemaSeats
