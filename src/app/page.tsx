import Link from "next/link";
import PostItem from "../components/layouts/post-item";
import PostMenu from "../components/layouts/post-menu";
import { getAllPosts } from "../services/post.service";
import { PostDTO } from "@/models/post";

export default async function Home() {
	const posts: PostDTO[] = await getAllPosts()
	return (
		<section className="grid md:ml-10">
			<div className="banner my-4- h-32"></div>
			<div className="navigator flex ml-5">
			<Link href="/post/1">Lasted</Link>
			</div>
			<div className="md:flex mt-4">
				<div className="grid xl:grid-cols-4 gap-4 md:grid-cols-2">
					{posts.map((post, key) => {
						return <PostItem key={key} post={post} />
					})}
					
				</div>
				<div className="xl:w-[50rem] mx-10">
					<PostMenu />
				</div>
			</div>
		</section>
	);
}
