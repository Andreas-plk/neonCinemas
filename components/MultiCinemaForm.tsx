"use client"

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import {Cinema} from "@/types/types"
import {toast} from "sonner";
import {CircleLoader} from "react-spinners";



interface ScreeningTime {
    roomId: string;
    time: string;
}

interface DaySchedule {
    weekday: number; // 0=Κυρ, 1=Δευτέρα...
    screenings: ScreeningTime[];
}

interface CinemaSchedule {
    cinemaId: string;
    startDate: string;
    endDate: string;
    days: DaySchedule[];
}

const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function ScreeningForm({ tmdbId }: {tmdbId: number}) {
    const [cinemas, setCinemas] = useState<Cinema[]>()
    const [cinemasSchedule, setCinemasSchedule] = useState<CinemaSchedule[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Προσθήκη νέου σινεμά στη φόρμα
    const addCinemaSchedule = () => {
        setCinemasSchedule([...cinemasSchedule, { cinemaId: "", startDate: "", endDate: "", days: [] }]);
    };




    const updateCinemaId = (index: number, cinemaId: string) => {
        const newSchedule = [...cinemasSchedule];
        newSchedule[index].cinemaId = cinemaId;
        if (!newSchedule[index].days.length) {
            newSchedule[index].days = Array.from({ length: 7 }, (_, i) => ({
                weekday: i,
                screenings: [],
            }));
        }

        setCinemasSchedule(newSchedule);
    };

    const removeCinema = (index: number) => {
        setCinemasSchedule((prev) => prev.filter((_, i) => i !== index));
    };


    const updateDateRange = (index: number, field: "startDate" | "endDate", value: string) => {
        const newSchedule = [...cinemasSchedule];
        newSchedule[index][field] = value;
        setCinemasSchedule(newSchedule);
    };


    const addScreening = (cinemaIdx: number, weekday: number) => {
        const newSchedule = [...cinemasSchedule];
        const day = newSchedule[cinemaIdx].days.find((d) => d.weekday === weekday);
        if (day) day.screenings.push({ roomId: "", time: "" });
        setCinemasSchedule(newSchedule);
    };


    const updateScreening = (cinemaIdx: number, weekday: number, screeningIdx: number, field: "roomId" | "time", value: string) => {
        const newSchedule = [...cinemasSchedule];
        const day = newSchedule[cinemaIdx].days.find((d) => d.weekday === weekday);
        if (day) day.screenings[screeningIdx][field] = value;
        setCinemasSchedule(newSchedule);
    };

    const removeScreening = (cinemaIdx: number, weekday: number, screeningIdx: number) => {
        const newSchedule = [...cinemasSchedule];
        const day = newSchedule[cinemaIdx].days.find(d => d.weekday === weekday);
        if (day) {
            day.screenings = day.screenings.filter((_, i) => i !== screeningIdx);
            setCinemasSchedule(newSchedule);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        setSuccess(false);


        for (const cinema of cinemasSchedule) {
            if (!cinema.cinemaId) return alert("Επίλεξε σινεμά για όλα τα blocks!");
            for (const day of cinema.days) {
                for (const screening of day.screenings) {
                    if (!screening.roomId || !screening.time) return alert("Συμπλήρωσε όλες τις αίθουσες και ώρες!");
                }
            }
        }

        try {
            const res = await fetch("/api/add_movie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tmdbId,
                    cinemasSchedule,
                }),
            })
            setSuccess(true);
            setCinemasSchedule([]);
        }catch (err:any) {
            setError(err.message || "Something went wrong");
            setCinemasSchedule([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const res = await fetch("/api/get_cinemas");
                const data = await res.json();
                setCinemas(data);
            } catch (err) {
                toast.warning("Something went wrong");
                console.error(err);
            }
        };
        fetchCinemas();
    }, []);
    if(!cinemas){
        return (<CircleLoader color={"#FF7675"}/>)
    }

    return (
        <div className="space-y-10 p-10 max-h-[75vh] w-full rounded-lg shadow-md max-w-4xl mx-auto">
            {cinemasSchedule.map((cinemaBlock, cinemaIdx) => (
                <div key={cinemaIdx} className="border p-4 rounded space-y-6  ">
                    {/* Cinema select */}
                    <div className="flex flex-col items-center gap-2">
                        <Label>Cinema</Label>
                        <Select onValueChange={(val) => updateCinemaId(cinemaIdx, val)} value={cinemaBlock.cinemaId}>

                            <SelectTrigger className="cursor-pointer">
                                <SelectValue placeholder="Select Cinema" />
                            </SelectTrigger>
                            <SelectContent>
                                {cinemas.map((c) => (
                                    <SelectItem className="cursor-pointer" key={c.id} value={c.id}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>


                    {/* Date range */}
                    {cinemasSchedule[cinemaIdx].cinemaId &&
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="startDate">Από</Label>

                                <Button variant="outline" id="startDate" className="w-[240px] pl-3 text-left">
                                    {cinemaBlock.startDate ? format(new Date(cinemaBlock.startDate), "yyyy-MM-dd") : "Επίλεξε ημερομηνία"}
                                </Button>

                                <Calendar
                                    className="flex"
                                    mode="single"
                                    selected={cinemaBlock.startDate ? new Date(cinemaBlock.startDate) : undefined}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        if (date) {
                                            updateDateRange(cinemaIdx, "startDate", date.toISOString())
                                            if (cinemaBlock.endDate && date>new Date(cinemaBlock.endDate)) {
                                                updateDateRange(cinemaIdx, "endDate", "")
                                            }
                                        }

                                    }}
                                />

                        </div>
                        <div className="flex flex-col gap-2">
                           <Label htmlFor="endDate">Έως</Label>
                            <Button variant="outline" id="endDate" className="w-[240px] pl-3 text-left">
                                {cinemaBlock.endDate ? format(new Date(cinemaBlock.endDate), "yyyy-MM-dd") : "Επίλεξε ημερομηνία"}
                            </Button>

                            <Calendar
                                className="flex"
                                mode="single"
                                selected={cinemaBlock.endDate ? new Date(cinemaBlock.endDate) : undefined}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                    if (date && date>=new Date(cinemaBlock.startDate)) {
                                        updateDateRange(cinemaIdx, "endDate", date.toISOString())
                                    }else {
                                        toast.warning("End date cannot be earlier than start date!");
                                    }

                                }}
                            />

                        </div>
                    </div>}

                    {/* Days */}
                    {cinemaBlock.days.map((day) => (
                        <div key={day.weekday} className="border-t pt-2">
                            <Label className="text-xl font-semibold">{weekdayNames[day.weekday]}</Label>
                            {day.screenings.map((screening, screeningIdx) => (
                                <div key={screeningIdx} className="flex gap-2 mt-1 items-center">
                                    {/* Room */}
                                    <Select onValueChange={(val) => updateScreening(cinemaIdx, day.weekday, screeningIdx, "roomId", val)} value={screening.roomId}>
                                        <SelectTrigger className="w-40 cursor-pointer">
                                            <SelectValue placeholder="Επίλεξε αίθουσα" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cinemas.find(c => c.id === cinemaBlock.cinemaId)?.rooms.map(r => (
                                                <SelectItem className="cursor-pointer" key={r.id} value={r.id}>{r.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {/* Time */}
                                    <Input  type="time" value={screening.time} onChange={(e) => updateScreening(cinemaIdx, day.weekday, screeningIdx, "time", e.target.value)} className="w-30 cursor-pointer" />
                                    <Button size="sm" variant="destructive" className="cursor-pointer" type="button"  onClick={() => removeScreening(cinemaIdx, day.weekday, screeningIdx)}>X</Button>
                                </div>
                            ))}
                            <Button size="sm" type="button" variant="outline"  onClick={() => addScreening(cinemaIdx, day.weekday)} className="mt-1 cursor-pointer">Προσθήκη προβολής</Button>
                        </div>
                    ))}
                    <Button size="sm" type="button" variant="destructive" className="w-full cursor-pointer" onClick={() => removeCinema(cinemaIdx)}>Αφαίρεση σινεμά</Button>
                </div>
            ))}

            <Button className="my-button button-glow !w-full" type="button" onClick={addCinemaSchedule}>Προσθήκη σινεμά</Button>
            <Button type="button" disabled={cinemasSchedule.length===0 || loading} onClick={handleSubmit} className="my-button button-glow w-full! my-4">
                {loading ? "Importing..." : "Import Movie and create Screenings"}
            </Button>
            {success && <p className="text-green-500 mt-2">Movie imported!</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}

        </div>

    );
}
