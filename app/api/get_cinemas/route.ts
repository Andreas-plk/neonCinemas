import prisma from "@/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req:NextRequest){
    try{
        const cinemas= await prisma.cinema.findMany({
            include:{rooms:true}
        })
        return NextResponse.json(cinemas);
    }catch(err){
        console.error(err);
    }
}