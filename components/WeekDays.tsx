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
import { useRouter } from 'next/navigation'




const WeekDays = ({dateTime, id }:{dateTime:any ,id:any}) => {

    // const dummyCinemas:string[]=["Athens","Thessaloniki","Volos"];
    // const dummyTimes=[["16:00","Room 2"],["18:00","Room 1"],["21:00","Room 2"]];
    const [cinemas, setCinemas] = useState<{
        id: string
        name: string
        location: string
        rooms:[]
    }[]>()
    const [selectedCinema, setSelectedCinema] = useState<{
        id: string
        name: string
        location: string
        rooms:[]
    }>();
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedScreening, setSelectedScreening] = useState<string[] | null>(null)
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
        //TODO find screening id and redirect to page.For now i use 123 just to work
        router.push(`/movie/${id}/123`)
    }


    useEffect(() => {
        fetch('/api/get_cinemas')
        .then(res => res.json())
            .then(setCinemas)



    }, []);
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
                                    {cinemas && cinemas.map((cinema,index) => (
                                        <SelectItem className="cursor-pointer" value={cinema} key={index}>{cinema.name}</SelectItem>
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
                                <ChevronLeftIcon width={28} />
                                <span className="grid grid-cols-3 gap-3 md:flex flex-wrap md:max-w-lg">
                                {Object.keys(dateTime).slice(0, 5).map((date) => (
                                    <Button
                                        onClick={() => setSelectedDate(date)}
                                        key={date}
                                        className={`input-button ${selectedDate === date ? "!bg-second" : ""}`}
                                    >
                                        <span>{new Date(date).getDate()}</span>
                                        <span>{new Date(date).toLocaleDateString("en-US", { month: "short" })}</span>
                                    </Button>
                                ))}
                            </span>
                                <ChevronRightIcon width={28} />
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
                                    {selectedCinema && selectedCinema.rooms.map((dummy, index) => (

                                            <TableRow onClick={() => setSelectedScreening(dummy.name)}
                                                      className={`cursor-pointer rounded-md m-1 bg-bg/10 hover:bg-second/70 ${selectedScreening&&(selectedScreening === dummy.name ) ? "bg-second " : ""}`}
                                                      key={index}>
                                                <TableCell>{dummy.name}</TableCell>
                                                <TableCell>{dummy[1]}</TableCell>
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
