"use client";
import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";

type Ticket = { seat: string; type: string };

interface TicketContextType  {
    tickets: Ticket[];
    setTickets: Dispatch<SetStateAction<Ticket[]>>;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

    export function TicketProvider({ children }: { children: React.ReactNode }) {
        const [tickets, setTickets] = useState<Ticket[]>([]);
        return (
            <TicketContext.Provider value={{ tickets, setTickets }}>
                {children}
            </TicketContext.Provider>
        );
    }

    export function useTickets() {
        const context = useContext(TicketContext);
        if (!context) throw new Error("useTickets must be used inside TicketProvider");
        return context;
    }