import { FunctionComponent } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface PostItemProps {}

const PostItem: FunctionComponent<PostItemProps> = () => {
	return (
		<Card className="">
			<CardHeader>
				<CardTitle>Post Title</CardTitle>
				<CardDescription>Post Description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</CardContent>
			<CardFooter>
				<p>Post Footer</p>
			</CardFooter>
		</Card>
	);
};

export default PostItem;
