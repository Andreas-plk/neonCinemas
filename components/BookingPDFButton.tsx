'use client'
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { QRCodeCanvas } from "qrcode.react";
import {useEffect, useRef} from "react";
import {sendTicket} from "@/app/actions";


const BookingPDFButton = ({ booking,sendEmail=false }: { booking: any,sendEmail?:boolean }) => {
    const qrRef = useRef<HTMLCanvasElement>(null);


    const generatePDF =async () => {
        const doc = new jsPDF();
        const logoUrl = "/noBgBlack.png";
        const logo = await fetch(logoUrl)
            .then(res => res.blob())
            .then(blob => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                });
            });


        const pageWidth = doc.internal.pageSize.getWidth();
        doc.addImage(logo, "PNG", pageWidth / 2 -50, 0, 100, 25);





        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("Booking Details", 14, 35);


        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        let y = 45;
        const lineHeight = 8;

        doc.text(`Booking ID: ${booking.id}`, 14, y); y += lineHeight;
        doc.text(`Movie: ${booking.screening.movie.title}`, 14, y); y += lineHeight;
        doc.text(`Cinema: ${booking.screening.cinema.name}`, 14, y); y += lineHeight;
        doc.text(`Date: ${new Date(booking.screening.time).toLocaleDateString("en-GB")}`, 14, y); y += lineHeight;
        doc.text(`Time: ${new Date(booking.screening.time).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`, 14, y); y += lineHeight;

        if (booking.user) {
            doc.text(`User: ${booking.user.name ?? booking.user.email}`, 14, y);
            y += lineHeight;
        }else{
            doc.text(`Guest: ${booking.guestEmail}`, 14, y);
            y += lineHeight;
        }

        doc.text(`Total Price: €${booking.totalPrice.toFixed(2)}`, 14, y);


        autoTable(doc, {
            startY: y + 10,
            head: [["Seat", "Type"]],
            body: booking.selectedSeats.map((s: any) => [s.seat, s.type]),
            theme: "grid",
            styles: { fontSize: 11, cellPadding: 3 },
            headStyles: { fillColor: [255, 118, 117], textColor: 17 },
            alternateRowStyles: { fillColor: [240, 240, 240] },
        });


        const canvas = qrRef.current;
        if (canvas) {
            const qrImage = canvas.toDataURL("image/png");
            doc.addImage(qrImage, "PNG", doc.internal.pageSize.getWidth() - 60, 30, 40, 40);
        }


        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(
            "Thank you for booking with Neon Cinemas! Enjoy your movie",
            doc.internal.pageSize.getWidth() / 2 - 20,
            doc.internal.pageSize.getHeight() - 20,
            { align: "center" }
        );



            const pdfUrl = doc.output("bloburl");
            window.open(pdfUrl, "_blank");


    };


    useEffect(() => {
        if(sendEmail){
            sendTicket(booking)


        }
    }, []);

    return (
        <>
            <div style={{ display: "none" }}>
                <QRCodeCanvas
                    value={JSON.stringify({ bookingId: booking.id })}
                    size={150}
                    level="H"
                    ref={qrRef}
                />
            </div>

            <Button variant="outline" className="cursor-pointer" onClick={generatePDF}>
                Download Ticket
            </Button>
        </>
    );
};

export default BookingPDFButton;
