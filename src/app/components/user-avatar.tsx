import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthUser } from "@/models/auth-user";
import { getInitials } from "../utilities/string-utils";

interface props {
  user: AuthUser
}
export default function UserAvatar(props: props) {
  const user = props.user
  const initialName = getInitials(user.name)
	return (
		<Avatar>
			<AvatarImage src={user.image} />
			<AvatarFallback>{initialName}</AvatarFallback>
		</Avatar>
	);
}
