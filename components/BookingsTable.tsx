"use client";

import { format } from "date-fns";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { deleteBooking } from "@/app/actions";
import BookingPDFButton from "@/components/BookingPDFButton";

interface BookingsTableProps {
    bookings: any[];
    admin: boolean;
}

export default function BookingsTable({ bookings,admin=false }: BookingsTableProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete(id: string) {
        setIsDeleting(true);
        await deleteBooking(id,admin);
        setIsDeleting(false);
        setSelectedId(null);
    }

    if (bookings.length === 0) return <p>No bookings found.</p>;

    return (
        <Table>
            <TableHeader>
                <TableRow className="text-center">
                    <TableHead>Movie</TableHead>
                    <TableHead>Cinema</TableHead>
                    <TableHead>Screening Time</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Download</TableHead>
                    <TableHead>Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings.map((b) => (
                    <TableRow key={b.id}>
                        <TableCell>{b.screening.movie.title}</TableCell>
                        <TableCell>{b.screening.cinema.name}</TableCell>
                        <TableCell>{format(new Date(b.screening.time), "dd/MM/yyyy HH:mm")}</TableCell>
                        <TableCell>{b.selectedSeats.length}</TableCell>
                        <TableCell>€{b.totalPrice.toString()}</TableCell>
                        <TableCell><BookingPDFButton booking={b}/></TableCell>
                        <TableCell>
                            <Button
                                variant="destructive"
                                className="cursor-pointer"
                                size="sm"
                                onClick={() => setSelectedId(b.id)}
                            >
                                Delete
                            </Button>

                            <Dialog open={selectedId === b.id} onOpenChange={() => setSelectedId(null)}>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Confirm deletion</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone.You get no refund for the tickets. Are you sure you want to delete this booking?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant="outline" className="cursor-pointer" onClick={() => setSelectedId(null)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            className="cursor-pointer"
                                            onClick={() => handleDelete(b.id)}
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? "Deleting..." : "Delete"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
