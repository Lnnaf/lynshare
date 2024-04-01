import { FunctionComponent } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Post, User } from "@prisma/client";
import Image from "next/image";
import { PostDTO } from "@/models/post";
import UserAvatar from "../common/user-avatar";
import Link from "next/link";

interface PostItemProps {
	post: PostDTO;
}

const PostItem: FunctionComponent<PostItemProps> = (props) => {
	const post = props.post;

	return (
		<Card className="">
			<Link href={`post/${post.id}`}>
				<CardHeader>
					<CardTitle>{post.title}</CardTitle>
					<CardDescription>Post Description</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col">
					<div className="w-full relative h-40">
						<Image
							alt={post.title}
							src={post.thumbnail}
							fill
							className="rounded-xl"
						/>
					</div>
					{/* <span>{post.content}</span> */}
				</CardContent>
			</Link>
			<CardFooter>
				<UserAvatar user={post.user as User} />
				<p>{post.user.name}</p>
			</CardFooter>
		</Card>
	);
};

export default PostItem;
