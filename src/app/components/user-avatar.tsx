import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "../utilities/string-utils";
import { User } from "next-auth";

interface props {
  user: User
}
export default function UserAvatar(props: props) {
  const user = props.user

  const initialName = getInitials(user.name as string)
	return (
		<Avatar className="focus:outline-none">
			<AvatarImage src={user.image as string} />
			<AvatarFallback>{initialName}</AvatarFallback>
		</Avatar>
	);
}
