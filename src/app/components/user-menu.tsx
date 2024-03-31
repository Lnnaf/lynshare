import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FunctionComponent } from "react";
import { signOut } from "../services/auth";
import UserAvatar from "./user-avatar";
import { User } from "next-auth";

interface UserMenuProps {
	user: User;
}

const UserMenu: FunctionComponent<UserMenuProps> = (props) => {
	const user = props?.user;
	return (
		<section>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<UserAvatar user={user} />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<Link href={"/profile/manage"}>
							<DropdownMenuItem>Profile</DropdownMenuItem>
						</Link>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => signOut()}>
							Sign out
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</section>
	);
};

export default UserMenu;
