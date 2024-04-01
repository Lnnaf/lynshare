"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import ApiService, { API_PATHS } from "../../services/api.service";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import moment from "moment";
import { CalendarClock } from "lucide-react";
import { isEnoughDaysPassed } from "@/lib/date-utils";
interface prop {
	user_id: string;
}

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email({ message: "Invalid email address" }).optional(),
	user_id: z.string().optional(),
});

export function ProfileForm(props: prop) {
	const [user, setUser] = useState<User>();
	const [countdown, setCountdown] = useState<string | null>(null);
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: user?.name as string,
			email: user?.email as string,
			user_id: props.user_id,
		},
	});
	useEffect(() => {
		const fetchUser = async () => {
			const _user = await ApiService.get<User>(
				API_PATHS.getUserById.replace(":user_id", props.user_id)
			);
			if (_user) {
				form.reset({
					name: _user.name as string,
					email: _user.email as string,
					user_id: _user.id,
				});
			}
			setUser(_user);
		};

		fetchUser();
	}, [form]);

	// This useEffect hook is used to update the user's profile information.
	// It fetches the user's data from the API when the component is first rendered.
	// If the user's data is successfully fetched, it resets the form with the user's current information.
	// The user's data is also set in the local state for further use in the component.
	useEffect(() => {
		const calculateTimeValidToChangeName = () => {
			if (user?.lastChangedName) {
				const lastChangedNameDate = moment(user.lastChangedName);
				const now = moment();
				const diffInDays = now.diff(lastChangedNameDate, "days");
				if (diffInDays < 30) {
					const validChangeDate = lastChangedNameDate.add(30, "days");
					const duration = moment.duration(validChangeDate.diff(now));
					const days = Math.floor(duration.asDays());
					const hours = duration.hours();
					const minutes = duration.minutes();
					const seconds = duration.seconds();
					return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
				}
			}
			return null;
		};

		const countdownInterval = setInterval(() => {
			setCountdown(calculateTimeValidToChangeName());
		}, 1000);

		return () => clearInterval(countdownInterval);
	}, [user]);

	const checkLastChangedNameValid = () => {
		if (user?.lastChangedName && isEnoughDaysPassed(user?.lastChangedName, 30)) {
			return false;
		}
		return true;
	};


	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		ApiService.put(API_PATHS.updateUserInfor, values)
			.then((res) => {
				if (res && (res as User).id) {
					setUser(res as User);
				}
				if (res && (res as { status: string }).status === "no update") {
					toast({
						variant: "default",
						title: "Slow down!",
						description:
							"Nothing changed cause you didn't change anything.",
					});
					return;
				}
				toast({
					title: "Success",
					description: "Profile updated successfully",
				});
			})
			.catch((err) => {
				toast({
					variant: "destructive",
					title: "Error",
					description: "Profile update failed",
				});
			});
	}

	return (
		<>
			{user && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<FormField
							disabled={checkLastChangedNameValid()}
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Display name</FormLabel>
									<FormControl>
										<Input
											placeholder={user?.name || ""}
											{...field}
										/>
									</FormControl>
									<FormDescription
										className={
											checkLastChangedNameValid()
												? "text-red-500"
												: ""
										}
									>
										{renderNameChangeMessage(checkLastChangedNameValid, countdown)}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							disabled
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="shadcn"
											{...field}
										/>
									</FormControl>
									<FormDescription className="text-red-500">
										You cannot change the email.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			)}
		</>
	);
}

/**
 * This function is used to render the message for name change.
 * If the last name change was less than 30 days ago, it shows a message indicating the next valid change date.
 * Otherwise, it shows a default message about the display name.
 *
 * @param {() => boolean} checkLastChangedNameValid - A function that checks if the last name change is valid.
 * @param {string | null} countdown - The countdown time to the next valid name change.
 * @returns {JSX.Element} The message to be displayed.
 */
function renderNameChangeMessage(checkLastChangedNameValid: () => boolean, countdown: string | null) {
	if (checkLastChangedNameValid()) {
		return (
			<div className="flex gap-2 items-center">
				<CalendarClock />
				{`You can only change your name every 30 days. Next valid change is: ${
					countdown ? countdown : ""
				}`}
			</div>
		);
	} else {
		return "This is your display name that will be shown to other users.";
	}
}
