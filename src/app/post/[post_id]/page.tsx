import NotFound from "@/app/not-found";
import UserAvatar from "@/components/common/user-avatar";
import Container from "@/components/layouts/container";
import { formatDate } from "@/lib/date-utils";
import { convertToHTML } from "@/lib/plate-utils";
import { PostDTO } from "@/models/post";
import { findById } from "@/services/post.service";
import { User } from "@prisma/client";
import { Value } from "@udecode/plate-common";
import Image from "next/image";
import Link from "next/link";

interface props {
	params: {
		post_id: number;
	};
}

export default async function Post(props: props) {
	const post_id = Number(props.params.post_id);
	const post: PostDTO | null = await findById(post_id);
	if (post == null) {
		return <NotFound />;
	}
	const plateData: Value = JSON.parse(post.content);
	return (
		<Container>
			<div className="flex flex-col">
				<div className="max-w h-96 relative">
					<Image
						src={post.thumbnail}
						layout="fill"
						className="rounded-t-xl"
						alt=""
					/>
				</div>
				{/* Author section */}
				<div className="flex mt-4">
					<div>
						<UserAvatar user={post.user as User} />
					</div>
					<div className="flex flex-col ml-2">
						<p>{post.user.name}</p>
						<p>{`Posted on ${formatDate(
							post.createdAt
						)} • Originally published`}</p>
					</div>
				</div>
				{/* Title section */}
				<div className="text-5xl mt-2">
					<p>{post.title}</p>
				</div>
				{/* tags section */}
				<div className="mt-2 text-lg flex gap-4">
					<Link href="/">#123</Link>
					<Link href="/">#123</Link>
					<Link href="/">#123</Link>
				</div>
				{/* content */}
				<div dangerouslySetInnerHTML={{__html: convertToHTML(plateData)}} />
			</div>
		</Container>
	);
}
