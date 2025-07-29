'use client'
import React, {useState} from 'react'
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

const WeekDays = ({dateTime, id }:{dateTime:any ,id:any}) => {
    const dummyCinemas:string[]=["Athens","Thessaloniki","Volos"];
    const dummyTimes=[["16:00","Room 2"],["18:00","Room 1"],["21:00","Room 2"]];
    const [selectedCinema, setSelectedCinema] = useState("");
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedScreening, setSelectedScreening] = useState<string[] | null>(null);
    return (
        <div id="selectDate" className="pt-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10
                            relative p-8 bg-second/10 border border-second/20 rounded-md">
                <div>
                    <p className="text-lg font-semibold">Select Cinema</p>
                    <div className="flex items-center gap-6 text-sm mt-5">
                        <Select onValueChange={setSelectedCinema}>
                            <SelectTrigger className="w-[180px] cursor-pointer">
                                <SelectValue placeholder="Select Cinema" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="text-text">
                                    <SelectLabel>Cinemas</SelectLabel>
                                    {dummyCinemas.map((cinema,index) => (
                                        <SelectItem className="cursor-pointer" value={cinema} key={index}>{cinema}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {/* Date Selection */}
                {selectedCinema && (
                    <div>
                        <p className="text-lg font-semibold">Choose Date</p>
                        <div className="flex items-center gap-6 text-sm mt-5">
                            <ChevronLeftIcon width={28} />
                            <span className="grid grid-cols-3 gap-3 md:flex flex-wrap md:max-w-lg">
                                {Object.keys(dateTime).slice(0, 5).map((date) => (
                                    <Button
                                        onClick={() => setSelectedDate(date)}
                                        key={date}
                                        className={`flex flex-col items-center justify-center bg-bg/10 h-14 !w-14 aspect-square rounded cursor-pointer hover:bg-second/70 ${selectedDate === date ? "bg-second" : ""}`}
                                    >
                                        <span>{new Date(date).getDate()}</span>
                                        <span>{new Date(date).toLocaleDateString("en-US", { month: "short" })}</span>
                                    </Button>
                                ))}
                            </span>
                            <ChevronRightIcon width={28} />
                        </div>
                    </div>
                )}



                {/* Screening Selection */}
                {selectedDate && (
                    <div>
                        <p className="text-lg font-semibold">Select Screening</p>
                        <div className="flex items-center gap-6 text-sm mt-5">
                            <Table>
                                <TableBody className="flex flex-col">
                                    {dummyTimes.map((dummy, index) => (

                                            <TableRow onClick={() => setSelectedScreening(dummy)}
                                                      className={`cursor-pointer rounded-md m-1 bg-bg/10 hover:bg-second/70 ${selectedScreening&&(selectedScreening[0] === dummy[0] && selectedScreening[1]===dummy[1]) ? "bg-second " : ""}`}
                                                      key={index}>
                                                <TableCell>{dummy[0]}</TableCell>
                                                <TableCell>{dummy[1]}</TableCell>
                                            </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}

                     <Button className="my-button button-glow scale-120 ">Book now</Button>


            </div>
        </div>


    )
}
export default WeekDays
