

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { motion } from "motion/react"

const SeatSelection = ({seat, onTicketChange}:{seat:string, onTicketChange: (type: string) => void }) => {
    const ticketTypes = ["Normal","Student (50%)","Kids under 10 (50%)","Elders over 65 (25%)"]
    return (
        <motion.div
            layout
            transition={{ layout: { duration: 0.3 }}}
            initial={{x:60,opacity:0}}
            animate={{x:0,opacity:1}}
            exit={{x:60,opacity:0}}
            className="w-[270] h-[100px] my-2 p-5 bg-second/10 border border-second/20 rounded-md flex flex-col justify-center items-center">
          Select ticket type for seat: {seat}
            <Select onValueChange={onTicketChange} >
                <SelectTrigger className="w-[180px] cursor-pointer">
                    <SelectValue placeholder="Select ticket type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup className="text-text">
                        <SelectLabel>Ticket types</SelectLabel>
                        {ticketTypes.map((ticket,index) => (
                            <SelectItem className="cursor-pointer" value={ticket} key={index}>{ticket}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </motion.div>
    )
}
export default SeatSelection
