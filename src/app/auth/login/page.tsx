
import ButtonAuth from "@/components/common/button-auth";
import Image from "next/image";
import { FunctionComponent } from "react";


interface SigninPageProps {
	searchParams: { callbackUrl: string };
}

const SigninPage: FunctionComponent<SigninPageProps> = (props) => {
	const callbackUrl = props.searchParams.callbackUrl;

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<Image
						width={100}
						height={100}
						className="w-8 h-8 mr-2"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
						alt="logo"
					/>
					Flowbite
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in via:
						</h1>
						<ButtonAuth callbackUrl={callbackUrl} isSignIn={true}/>
					</div>
				</div>
			</div>
		</section>

		// <>
		// 	<button
		// 		type="button"
		// 		onClick={() =>
		// 			signIn("google", {
		// 				redirect: true,
		// 				callbackUrl: callbackUrl,
		// 			})
		// 		}
		// 	>
		// 		{" "}
		// 		Signin via google
		// 	</button>
		// </>
	);
};

export default SigninPage;
