"use client";

import { Button } from "@/components/ui/button";
import { AuthUser } from "@/models/auth-user";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SwitchTheme from "./buttons/switch-theme";
import UserMenu from "./user-menu";
import { Skeleton } from "@/components/ui/skeleton";

export function Navbar() {
	const [onMobileMenuTongle, setOnMobileMenuTongle] = useState(false);
	const { status, data: session } = useSession();
	const user = session?.user as AuthUser;

	return (
		<div className="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<div className="mr-4 md:mr-1 hidden md:flex">
					{/* logo */}
					<div className="mr-4 md:mr-2 lg:mr-6 flex items-center lg:space-x1 xl:space-x-2">
						<span>This is logo</span>
					</div>
					<nav className="flex items-center max-lg:space-x-4 space-x-6 text-sm font-medium">
						<a
							className="transition-colors hover:text-foreground/80 text-foreground/60"
							href="/"
						>
							xxx
						</a>
						<a
							className="transition-colors hover:text-foreground/80 text-foreground/60"
							href="/"
						>
							xxx
						</a>
						<a
							className="transition-colors hover:text-foreground/80 text-foreground/60"
							href="/"
						>
							xxx
						</a>
					</nav>
				</div>
				<Button
					onClick={() => {
						setOnMobileMenuTongle(!onMobileMenuTongle);
					}}
					variant="outline"
					size="icon"
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
				>
					{onMobileMenuTongle ? <X /> : <Menu />}
				</Button>
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<div className="w-full flex-1 md:w-auto md:flex-none"></div>
					<nav className="flex items-center">
						{status !== "loading" ? (
							<>
								{!user ? (
									<Button variant="outline">
										<a href="/auth/signin">Sign in</a>
									</Button>
								) : (
									<UserMenu user={user} />
								)}
							</>
						) : (
							<Skeleton className="h-12 w-12 rounded-full" />
						)}

						<div className="p-4">
							<SwitchTheme />
						</div>
					</nav>
				</div>
			</div>
			{onMobileMenuTongle && (
				<motion.div
					animate={{ y: -390 }}
					transition={{ ease: "easeOut", duration: 0.2 }}
					className="absolute z-20 mt-96 grid gap-x-64 rounded-md bg-popover p-4 text-popover-foreground shadow-md w-screen md:hidden"
				>
					<nav className="grid grid-flow-row auto-rows-max text-sm">
						<a className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline">
							xxxx
						</a>
					</nav>
				</motion.div>
			)}
		</div>
	);
}
