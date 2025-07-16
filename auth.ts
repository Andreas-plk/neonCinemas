import NextAuth from "next-auth"
import {prisma} from "@/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter:PrismaAdapter(prisma),
    providers: [Google],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 60,  // 30 minutes
        updateAge: 15 * 60// Χωρίς Session model
    },

})