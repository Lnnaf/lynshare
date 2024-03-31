import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthUser } from "@/models/auth-user";
import { FunctionComponent } from "react";
import { signOut } from "../services/auth";
import UserAvatar from "./user-avatar";

interface UserMenuProps {
	user: AuthUser
}

const UserMenu: FunctionComponent<UserMenuProps> = (props) => {
	const user = props?.user
	return (
		<section>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
				<UserAvatar user={user} />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>Profile</DropdownMenuItem>

						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</section>
	);
};

export default UserMenu;
