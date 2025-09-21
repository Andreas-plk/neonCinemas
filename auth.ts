import NextAuth from "next-auth"
import prisma from "@/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import {getUser} from "@/app/actions";
import {redirect} from "next/navigation";


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter:PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                console.log(credentials.email)
                const user = await getUser(credentials.email as string);
                console.log(user)
                if (!user) {
                    return null
                }
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const bcrypt = require("bcrypt");
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;
                return user
            },
        })
        ,
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        })],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 60,
        updateAge: 15 * 60
    },

})