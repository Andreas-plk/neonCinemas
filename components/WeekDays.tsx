'use client'
import React, {useState,useEffect} from 'react'
import {Button} from "@/components/ui/button";
import {ChevronLeftIcon ,ChevronRightIcon} from 'lucide-react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {AnimatePresence, motion} from "motion/react";
import {toast} from "sonner";
import {useParams, useRouter} from 'next/navigation'
import {ScreeningWithRelations} from "@/types/types"


const WeekDays = () => {
    const {id}  = useParams()
    const [cinemas, setCinemas] = useState<{
        id: string
        name: string
        location: string
        rooms:[]
    }[]>()

    const [screenings, setScreenings] = useState<ScreeningWithRelations[]>([])

    const [selectedCinema, setSelectedCinema] = useState<string|null>(null);
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedScreening, setSelectedScreening] = useState<string | null>(null)
    const [dateStartIdx, setDateStartIdx] = useState(0);
    const router = useRouter();


    const bookingHandler=()=>{
        if(!selectedCinema || !selectedDate || !selectedScreening){
            return toast("Please select all the options",{
                action:{
                    label:"X",
                    onClick:()=>console.log("X")
                }
            })
        }
        router.push(`/movie/${id}/${selectedScreening}`)
    }
    const uniqueDates = Array.from(
        new Set(
            screenings
                .filter(s => s.cinemaId === selectedCinema)
                .map(s => new Date(s.time).toDateString())
        )
    ).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    useEffect(() => {
        fetch('/api/get_cinemas')
        .then(res => res.json())
            .then(setCinemas)
    }, []);

    useEffect(() => {
        fetch(`/api/get_screenings?id=${id}`)
            .then(res => res.json())
            .then(setScreenings)
    }, [id])

    if(!cinemas || !screenings){
        return <p>Loading</p>
    }

    return (
        <motion.div id="selectDate" className="pt-20" layout  transition={{ layout: { duration: 0.7, ease: "easeIn" } }}>
            <motion.div layout className="flex flex-col md:flex-row items-center justify-between gap-10
                            relative p-8 bg-second/10 border border-second/20 rounded-md">
                <div>
                    <p className="text-lg font-semibold text-center">Select Cinema</p>
                    <motion.div layout className="flex items-center gap-6 text-sm mt-5">
                        <Select onValueChange={setSelectedCinema}>
                            <SelectTrigger className="w-[180px] cursor-pointer">
                                <SelectValue placeholder="Select Cinema" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="text-text">
                                    <SelectLabel>Cinemas</SelectLabel>
                                    {cinemas.filter(c=>screenings?.some(s=>s.cinemaId===c.id)).map((cinema,index) => (
                                        <SelectItem className="cursor-pointer" value={cinema.id} key={index}>{cinema.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </motion.div>
                </div>
                {/* Date Selection */}
                <AnimatePresence initial={false}>
                    {selectedCinema && (
                        <motion.div layout initial={{ opacity: 0 ,y:-50,}}
                                    animate={{ opacity: 1 ,y:0,transition: { duration: 0.7,ease: 'easeIn' } }}
                                    key="box">
                            <p className="text-lg font-semibold text-center">Choose Date</p>
                            <div className="flex items-center gap-6 text-sm mt-5">
                                <ChevronLeftIcon
                                    width={28}
                                    className="cursor-pointer"
                                    onClick={() => setDateStartIdx(Math.max(0, dateStartIdx - 1))}
                                />

                                <div className="flex gap-3 overflow-hidden">
                                    {uniqueDates.slice(dateStartIdx, dateStartIdx + 5).map((dateStr, idx) => (
                                        <Button
                                            key={idx}
                                            onClick={() => setSelectedDate(dateStr)}
                                            className={`input-button ${
                                                selectedDate === dateStr ? "!bg-second" : ""
                                            }`}
                                        >
                                            <span>{new Date(dateStr).getDate()}</span>
                                            <span>{new Date(dateStr).toLocaleDateString("en-US", { month: "short" })}</span>
                                        </Button>
                                    ))}
                                </div>

                                <ChevronRightIcon
                                    width={28}
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setDateStartIdx(
                                            Math.min(uniqueDates.length - 5, dateStartIdx + 1)
                                        )
                                    }
                                />
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>




                {/* Screening Selection */}
                <AnimatePresence initial={false}>
                {selectedDate && (
                    <motion.div layout initial={{ opacity: 0 ,y:-50,}}
                                animate={{ opacity: 1 ,y:0,transition: { duration: 0.7,ease:"easeIn" } }}
                                key="box">
                        <p className="text-lg font-semibold text-centerx">Select Screening</p>
                        <div className="flex items-center gap-6 text-sm mt-5">
                            <Table>
                                <TableBody className="flex flex-col">
                                    {selectedCinema && screenings
                                            .filter(s => s.cinemaId === selectedCinema)
                                            .filter(s => new Date(s.time).toDateString() === new Date(selectedDate).toDateString())
                                            .map((s, idx) => (
                                                <TableRow
                                                    key={idx}
                                                    onClick={() => setSelectedScreening(s.id)}
                                                    className={`cursor-pointer rounded-md m-1 hover:bg-second/70 ${
                                                        selectedScreening === s.id ? "bg-second" : "bg-bg/10"
                                                    }`}
                                                >
                                                    <TableCell>{s.room.name}</TableCell>
                                                    <TableCell>{new Date(s.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                                </TableRow>
                                            ))}
                                </TableBody>
                            </Table>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                <Button onClick={()=>bookingHandler()} className="my-button button-glow scale-120 ">Book now</Button>


            </motion.div>
        </motion.div>


    )
}
export default WeekDays
