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
            cacheStrategy: {
                ttl: 10
            }
        });
    }catch (error){
        console.error(error);
    }
}

export async function getCinemas(){
    try{
        return await prisma.cinema.findMany({
            include:{rooms:true}
        })
    }catch(err){
        console.error(err);
    }
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
        include:{room:true},
    })
}

