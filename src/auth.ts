import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Credentials from "next-auth/providers/credentials"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        const pwHash = credentials.password
 

        user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
        })

 
        if (!user) {
          console.log("user not find....")
        }
        return user
      },
    }),
  ],

})