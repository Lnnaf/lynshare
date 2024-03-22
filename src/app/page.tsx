import Link from "next/link";
import PostItem from "./components/post-item";
import PostMenu from "./components/post-menu";

export default async function Home() {
	return (
		<section className="grid md:ml-10">
			<div className="banner my-4- h-32"></div>
			<div className="navigator flex ml-5">
			<Link href="/post/1">Lasted</Link>
			</div>
			<div className="flex mt-4">
				<div className="grid xl:grid-cols-4 gap-4 md:grid-cols-2">
					<PostItem />
					<PostItem />
					<PostItem />
					<PostItem />
					<PostItem />
					<PostItem />
				</div>
				<div className="xl:w-[100rem] mx-10">
					<PostMenu />
				</div>
			</div>
		</section>
	);
}
