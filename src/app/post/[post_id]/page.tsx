import BreadCrumb from "@/app/components/breadcrumb";
import UserAvatar from "@/app/components/user-avatar";
import { AuthUser } from "@/models/auth-user";
import Image from "next/image";
import Link from "next/link";

interface props {
	params: {
		post_id: number;
	};
}

export default function Post(props: props) {
	const post_id = props.params.post_id;
  const author: AuthUser = {
    email: '123@123',
    name: 'Linh Nguyen Van',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocJvEqsdO7d5yTMRljUxjMHPrUicFWUFGoHrGkQCIwC5XrA=s96-c'
  }
	return (
		<section className="lg:mx-auto max-w-[960px]">
			<div className="m-10">
				<BreadCrumb />
			</div>
			<div className="flex flex-col">
				<div className="max-w h-96 relative">
					<Image
						src={"https://picsum.photos/200/300"}
						layout="fill"
              className="rounded-t-xl"
						alt=""
					/>
				</div>
        {/* Author section */}
        <div className="flex mt-4">
          <div>
            <UserAvatar user={author}/>
          </div>
          <div className="flex flex-col ml-2">
            <p>{author.name}</p>
            <p>Posted on Mar 21 • Originally published</p>  
          </div>
        </div>
        {/* Title section */}
        <div className="text-5xl mt-2">
          <p>9 Simple 404 Page Examples To Use Now Into Your Project</p>
        </div>
        {/* tags section */}
        <div className="mt-2 text-lg flex gap-4">
          <Link href="/">#123</Link>
          <Link href="/">#123</Link>
          <Link href="/">#123</Link>
        </div>
        {/* content */}
        <div>
          
        </div>
			</div>
		</section>
	);
}
