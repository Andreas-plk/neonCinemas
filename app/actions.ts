'use server'
import prisma from "@/prisma";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {SeatType} from "@prisma/client";
import {revalidatePath} from "next/cache";
import {getRandomNumber} from "@/lib/utils";
import {auth} from "@/auth";
import fs from "fs";
import path from "path";



export async function getMovies(){
    try {
        return await prisma.movie.findMany({

            where: {
                playingNow: true,
                screenings:{
                    some:{time:{gte:new Date()},}
                }
            },
            include: {
                genres: true,
                trailer: true,
            },
            cacheStrategy: { ttl:0 }
        });
    }catch (error){
        console.error(error);
    }
}

export async function getUser(email:string){
    try{
        return await prisma.user.findUnique({where:{email}})
    }catch(err){
        console.error(err);
    }
}

export async function registerUser(email:string,password:string){

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("User already exists");
    }
    const name= "user"+getRandomNumber().toString();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const bcrypt= require("bcrypt");
    const pwHash= await bcrypt.hash(password,12);
    return await prisma.user.create({
        data: {
            name,
            email,
            password: pwHash,
        },
    });

}

export async function updateUserProfile(name:string,currentPassword?:string,newPassword?: string) {
    const session= await auth();
    const bcrypt= require("bcrypt");
    if (!session?.user?.email) {
        throw new Error("Not authenticated");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) throw new Error("User not found");

    if (newPassword) {
        if (!currentPassword) throw new Error("Current password is required");
        const isValid = await bcrypt.compare(currentPassword, user.password!);
        if (!isValid) throw new Error("Current password is incorrect");

        const hashed = await bcrypt.hash(newPassword, 12);
        user.password = hashed;
    }

    user.name = name;

    await prisma.user.update({
        where: { email: user.email },
        data: {
            name: user.name,
            password: user.password,
        },
    });

    return { message: "Profile updated successfully" };
}

export async function getTickets(){
    try {
        return await prisma.price.findMany({
            orderBy:{
                seatType:"asc"
            }
        })
    }catch (error){
        console.error(error);
    }

}

export async function updateTicket(fd:FormData){

    const seatType = fd.get("seatType") as SeatType | null;
    const valueRaw = fd.get("value");
    const valueStr = valueRaw === null ? null : String(valueRaw).trim();
    if (!seatType || !valueStr) return;
    try {
       await prisma.price.update(
            {where:{
            seatType
            },
            data:{
            value:valueStr
            },
        })
        revalidatePath("/admin/dashboard/tickets")
    }

    catch (error){
        console.error(error);
    }
}

export async function getPrice(type:string){
    const price= await prisma.price.findFirst({
        where:{seatType:type as SeatType},
        select:{value:true}
    }
    )
    if(price === null){
        return 0;
    }
    return price.value.toNumber();
}

export async function getScreening(id:string){
    return await prisma.screening.findFirst({
        where:{id},
        include:{
            room:true
        },
    })
}

export async function getUserBookings(userEmail:string){
    if (!userEmail)return [];
    const bookings= await prisma.booking.findMany({
        where:{
            user:{
                email:userEmail,
            },
        },
        include:{
            selectedSeats:true,
            user:true,
            screening:{
                include:{
                    cinema:true,
                    movie:true
                }
            },
        },
        orderBy:{createdAt:"desc"},
    })
    return bookings.map((b) => ({
        ...b,
        totalPrice: b.totalPrice.toNumber(),
    }));
}

export async function getAllBookings(){
    const bookings= await prisma.booking.findMany({
        include:{
            selectedSeats:true,
            user:true,
            screening:{
                include:{
                    cinema:true,
                    movie:true
                }
            },
        },
        orderBy:{createdAt:"desc"},
    })
    return bookings.map((b) => ({
        ...b,
        totalPrice: b.totalPrice.toNumber(),
    }));
}

export async function getBooking(paymentIntentId:string){
    const booking= await prisma.booking.findFirst({
        where:{paymentIntentId},
        include:{
            selectedSeats:true,
            user:true,
            screening:{
                include:{
                    cinema:true,
                    movie:true
                }
            },
        }
    })
    if (!booking){
        return null;
    }
    return {
        ...booking,
        totalPrice:booking.totalPrice.toNumber(),
    };
}

export async function deleteBooking(id: string,admin:boolean=false) {
    await prisma.booking.delete({ where: { id } });
    if (admin){
        revalidatePath("/admin/dashboard/");
    }else {
        revalidatePath("/booking/list");
    }

}


export async function getSelectedSeats(screeningId:string){
    const seats= await prisma.selectedSeat.findMany({
       where:{
           booking:{
               screeningId,
           },
       },
        select:{
           seat:true,
        },
        })
    return seats.map(s=>s.seat)
}

export async function sendTicket(booking: any) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nodemailer=require("nodemailer");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const QRCode=require("qrcode");


    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.setFont(font);
    page.setFontSize(16);
    page.drawText("Booking Details", { x: 14, y: 730 });

    // Κείμενα booking
    page.setFontSize(12);
    let y = 700;
    const lineHeight = 25;
    const addText = (text: string) => { page.drawText(text, { x: 14, y }); y -= lineHeight; };
    addText(`Booking ID: ${booking.id}`);
    addText(`Movie: ${booking.screening.movie.title}`);
    addText(`Cinema: ${booking.screening.cinema.name}`);
    addText(`Date: ${new Date(booking.screening.time).toLocaleDateString("en-GB")}`);
    addText(`Time: ${new Date(booking.screening.time).toLocaleTimeString("en-GB",{hour:'2-digit',minute:'2-digit'})}`);
    if (booking.user) addText(`User: ${booking.user.name ?? booking.user.email}`);
    addText(`Total Price: €${booking.totalPrice.toFixed(2)}`);

    y -= 10;
    page.drawText("Selected Seats:", { x: 14, y }); y -= lineHeight;
    booking.selectedSeats.forEach((s: any) => { page.drawText(`${s.seat} (${s.type})`, { x: 20, y }); y -= lineHeight; });

    // Logo
    const logoPath = path.join(process.cwd(), "public/noBgBlack.png");
    if (fs.existsSync(logoPath)) {
        const logoBytes = fs.readFileSync(logoPath);
        const logoImage = await pdfDoc.embedPng(logoBytes);
        page.drawImage(logoImage, { x: page.getWidth()/2 - 150, y: 750, width: 300, height: 75 });
    }

    // QR Code
    const qrData = JSON.stringify({ bookingId: booking.id });
    const qrBuffer = await QRCode.toBuffer(qrData);
    const qrImage = await pdfDoc.embedPng(qrBuffer);
    page.drawImage(qrImage, { x: page.getWidth() - 200, y: 600, width: 150, height: 150 });

    // Footer
    page.setFontSize(10);
    page.drawText("Thank you for booking with Neon Cinemas! Enjoy your movie", { x: page.getWidth()/2 - 100, y: 50, color: rgb(0.5,0.5,0.5) });

    const pdfBytes = await pdfDoc.save();

    // Στέλνουμε email
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: booking.user.email,
        subject: `Your Ticket #${booking.id}`,
        text: "Thank you for booking! Your ticket is attached.",
        attachments: [
            { filename: `booking_${booking.id}.pdf`, content: pdfBytes, contentType: "application/pdf" }
        ],
    });

    return { success: true };
}