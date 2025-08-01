import NextAuth from "next-auth"
import {prisma} from "@/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter:PrismaAdapter(prisma),
    providers: [
        Credentials({

            authorize: async (credentials) => {
                let user = null

                // logic to salt and hash password
                const pwHash = saltAndHashPassword(credentials.password)

                // logic to verify if the user exists
                user = await getUserFromDb(credentials.email, pwHash)

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.")
                }

                // return user object with their profile data
                return user
            },
        })
        ,
        Google],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 60,
        updateAge: 15 * 60
    },

})