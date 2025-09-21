'use server'
import prisma from "@/prisma";
import { SeatType} from "@prisma/client";
import {revalidatePath} from "next/cache";



export async function getMovies(){
    try {
        return await prisma.movie.findMany({

            where: {playingNow: true},
            include: {
                genres: true,
                trailer: true,
            },
            cacheStrategy: { swr: 60, ttl: 300 }
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
    const bcrypt= require("bcrypt");
    const pwHash= await bcrypt.hash(password,12);
    const user = await prisma.user.create({
        data: {
            email,
            password: pwHash,
        },
    });

    return user;

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

export async function getBooking(paymentIntentId:string){
    return prisma.booking.findFirst({
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
}

