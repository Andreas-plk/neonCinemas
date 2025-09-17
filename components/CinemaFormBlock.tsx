"use client"

import React, {useEffect, useState} from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";

type TimeEntry = { time: string; roomId: number };
type DayEntry = { day: string; times: TimeEntry[] };
type CinemaForm = { cinemaId: number | null; dateRange: { from: Date | null; to: Date | null }; days: DayEntry[] };



const CinemaFormBlock = ({movieId}:{movieId:number}) => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [cinemas, setCinemas] = useState<{
        id: string
        name: string
        location: string
        rooms:[]
    }[]>()
    const [form, setForm] = useState<CinemaForm>({
        cinemaId: null,
        dateRange: { from: null, to: null },
        days: [],
    });
    const toggleDay = (day: string) => {
        setForm((prev) => {
            const exists = prev.days.find((d) => d.day === day);
            if (exists) return { ...prev, days: prev.days.filter((d) => d.day !== day) };
            return { ...prev, days: [...prev.days, { day, times: [] }] };
        });
    };

    const addTime = (day: string) => {
        setForm((prev) => ({
            ...prev,
            days: prev.days.map((d) =>
                d.day === day ? { ...d, times: [...d.times, { time: "18:00", roomId: 0 }] } : d
            ),
        }));
    };
    const [selectedCinema, setSelectedCinema] = useState<{
        id: string
        name: string
        location: string
        rooms:[]
    }>();
    const weekdays = ["Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ", "Κυρ"];
    useEffect(() => {
        fetch('/api/get_cinemas')
            .then(res => res.json())
            .then(setCinemas)



    }, []);
    return (
        <div className="space-y-6  p-4 rounded-md flex flex-col justify-center items-center  inset-shadow-xs inset-shadow-second">
            {/* Επιλογή σινεμά */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Σινεμά</label>
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
            </div>

            {/* Επιλογή ημερομηνιών */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Ημερομηνίες</label>
                <Calendar mode="range" numberOfMonths={2} />
            </div>

            {/* Επιλογή ημερών εβδομάδας */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Ημέρες εβδομάδας</label>
                <div className="grid grid-cols-4 gap-2">
                    {weekdays.map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                            <Checkbox checked={form.days.some((d) => d.day === day)} onCheckedChange={() => toggleDay(day)} />
                            <span>{day}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dynamic ώρες + αίθουσες για κάθε μέρα */}
            <div className="space-y-4">
                {form.days.map((day) => (
                    <div key={day.day} className="border p-2 rounded space-y-2">
                        <p className="font-medium">{day.day}</p>
                        {day.times.map((t, idx) => (
                            <div key={idx} className="flex space-x-2">
                                <input
                                    type="time"
                                    value={t.time}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            days: prev.days.map((d) =>
                                                d.day === day.day
                                                    ? {
                                                        ...d,
                                                        times: d.times.map((timeEntry, i) =>
                                                            i === idx ? { ...timeEntry, time: e.target.value } : timeEntry
                                                        ),
                                                    }
                                                    : d
                                            ),
                                        }))
                                    }
                                    className="border rounded px-2 py-1"
                                />
                                <Select
                                    onValueChange={(v) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            days: prev.days.map((d) =>
                                                d.day === day.day
                                                    ? {
                                                        ...d,
                                                        times: d.times.map((timeEntry, i) =>
                                                            i === idx ? { ...timeEntry, roomId: Number(v) } : timeEntry
                                                        ),
                                                    }
                                                    : d
                                            ),
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Επιλέξτε αίθουσα" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Αίθουσα 1</SelectItem>
                                        <SelectItem value="2">Αίθουσα 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        ))}
                        <Button size="sm" variant="outline" onClick={() => addTime(day.day)}>
                            + Προσθήκη ώρας
                        </Button>
                    </div>
                ))}
            </div>
        </div>

    );

}
export default CinemaFormBlock
