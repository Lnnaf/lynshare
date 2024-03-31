"use client";
import { NextAuthProvider } from "@/app/enums/next-auth-provide";
import { signIn, signOut } from "@/app/services/auth";
import { FunctionComponent } from "react";
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { LogOut } from "lucide-react";

interface ButtonSigninProps {
	callbackUrl?: string;
	isSignIn: boolean;
}

const ButtonAuth: FunctionComponent<ButtonSigninProps> = (props) => {
	props.callbackUrl
	return (
		<>
			{props.isSignIn ? (
				<Button
					onClick={() =>
						signIn(NextAuthProvider.GOOGLE, props.callbackUrl)
					}
				>
					<Image
						width={100}
						height={100}
						className="w-6 h-6"
						src="https://www.svgrepo.com/show/475656/google-color.svg"
						loading="lazy"
						alt="google logo"
					/>
					<span>Login with Google</span>
				</Button>
			) : (
				<Button
					onClick={() =>
						signOut()
					}
				>
			Sign Out
					<LogOut className="mx-1 h-4 w-4"/>
				</Button>
			)}
		</>
	);
};

export default ButtonAuth;
