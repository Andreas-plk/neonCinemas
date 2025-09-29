"use client";
import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {Ticket} from "@/types/types"



interface TicketContextType  {
    tickets: Ticket[];
    setTickets: Dispatch<SetStateAction<Ticket[]>>;
    guestEmail: string|null;
    setGuestEmail: Dispatch<SetStateAction<string|null>>;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

    export function TicketProvider({ children }: { children: React.ReactNode }) {
        const [tickets, setTickets] = useState<Ticket[]>([]);
        const [guestEmail, setGuestEmail] = useState<string | null>(null)

        return (
            <TicketContext.Provider value={{ tickets, setTickets,guestEmail,setGuestEmail }}>
                {children}
            </TicketContext.Provider>
        );
    }

    export function useTickets() {
        const context = useContext(TicketContext);
        if (!context) throw new Error("useTickets must be used inside TicketProvider");
        return context;
    }