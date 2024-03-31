import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { findUserById } from "@/app/services/user.service";

const prisma = new PrismaClient()

export const options: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt'
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	secret: process.env.SECRET as string,
	pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error', // Error code passed in query string as ?error= // New users will be directed here on first sign in (leave the property out if not of interest)
  },
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			if (user) {
				return {
					...token,
					id: user.id,
				}
			}
      return token
    },
		async session({session, token,}) {
			if (token.id) {
				session.user.id = token.id as string;
				const _userDb = await findUserById(token.id as string)
				session.user.image = _userDb?.image
				session.user.name= _userDb?.name
			}
			return session
		}
	}
};
