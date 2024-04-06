import { NextAuthProvider } from "@/models/enums/next-auth-provide";
import {
	signOut as nextAuthSignOut,
	signIn as nextAuthSignIn,
} from "next-auth/react";

export const signOut = (redirectUrl?: string) => {
	nextAuthSignOut({ redirect: true, callbackUrl: redirectUrl || '/'});
};

export const signIn = (provider: NextAuthProvider, callbackUrl?: string) =>  {
  nextAuthSignIn(provider, {
    redirect: true,
    callbackUrl: callbackUrl || "/",
  })
}
