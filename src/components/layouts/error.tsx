"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface props {
	erorrType: {
		code: string;
		description: string;
	};
}
export default function ErrorComponent(props: props) {
  const codes = props.erorrType.code.split('')
	return (
		<main className="h-screen w-full flex flex-col justify-center items-center">
			<div className="flex">
				<motion.h1
					animate={{ y: [-10, +10, -10] }}
					transition={{
						repeat: Infinity,
						duration: 1.5,
						ease: "easeInOut",
					}}
					className="text-9xl font-extrabold  tracking-widest"
				>
					{codes[0]}
				</motion.h1>
				<motion.h1
					animate={{ y: [+10, -10, +10] }}
					transition={{
						repeat: Infinity,
						duration: 1.5,
						ease: "easeInOut",
					}}
					className="text-9xl font-extrabold  tracking-widest"
				>
					{codes[1]}
				</motion.h1>
				<motion.h1
					animate={{ y: [-10, +10, -10] }}
					transition={{
						repeat: Infinity,
						duration: 1.5,
						ease: "easeInOut",
					}}
					className="text-9xl font-extrabold  tracking-widest"
				>
					{codes[2]}
				</motion.h1>
			</div>
			<div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
				{props.erorrType.description}
			</div>
			<Button variant={"outline"} className="mt-5">
				<Link href="/">Go Home</Link>
			</Button>
		</main>
	);
}
