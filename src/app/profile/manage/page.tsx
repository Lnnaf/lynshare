"use client";
import Container from "@/app/components/container";
import ProfileSkeleton from "@/app/components/profile.skeleton";
import { ProfileForm } from "@/app/forms/profile.form";
import ApiService from "@/app/services/api.service";
import {
	FirebaseService,
	FirebaseUploadServiceParam,
	StorageType,
} from "@/app/services/firebase.service";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FileCheck2, ImageUp, Loader } from "lucide-react";
import moment from "moment";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function ProfileManage() {
	const { data: session, update } = useSession();
	const router = useRouter();
	const { toast } = useToast();

	const user: User = session?.user as User;
	const [onMouseOnAvatar, setOnMouseOnAvatar] = useState(false);
	const [imageUpload, setImageUpload] = useState<File>();
	const [avatar, setAvatar] = useState<String>();
	const [isLoading, setIsLoading] = useState<Boolean>(false);

	useEffect(() => {
		return () => {
			setAvatar(session?.user.image as string);
		}
	}, [session]);

	const onImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			var file = event.target.files[0];
			// validate file ext
			const validExtensions = ["jpeg", "jpg", "png", "gif"];
			setImageUpload(file);
			setAvatar(URL.createObjectURL(file));
			setIsLoading(false);
		}
	};

	const onChangeAvatar = () => {
		const firebase = FirebaseService.getInstance();
		if (imageUpload) {
		}
		const param: FirebaseUploadServiceParam = {
			file: imageUpload,
			fileName: `${user.id}_${moment().valueOf()}`,
			storageType: StorageType.AVATAR,
			onFail: (err) => {
				toast({
					variant: "destructive",
					title: "Upload error",
					description: `error: ${err.message}`,
				});
				setIsLoading(false);
			},
			onSuccess: async (imageUrl) => {
				toast({
					title: "Scheduled: Catch up",
					description: "Friday, February 10, 2023 at 5:57 PM",
				});
				setImageUpload(undefined);
				setIsLoading(false);
				//this will reload the page without doing SSR
				setAvatar(imageUrl);
				if (session) {
					session.user.image = imageUrl;
					ApiService.put("/user/image", {
						user_id: user.id,
						user_image: imageUrl,
					});
					update();
				}
			},
			onTask: () => setIsLoading(true),
		};
		firebase.upload(param);
	};
	return (
		<Container>
			{user ? (
				<div className="flex flex-col">
					{/* avatar */}
					<div
						className="w-60 h-60 relative"
						onMouseOver={() => setOnMouseOnAvatar(true)}
						onMouseLeave={() => setOnMouseOnAvatar(false)}
					>
						<Image
							className="rounded-full"
							src={avatar as string}
							alt="user-avatar"
							unoptimized={true}
							fill
						/>
						{onMouseOnAvatar && (
							<div className="bg-black opacity-60 w-60 h-60 rounded-full flex items-center justify-center z-10">
								<input
									id="file"
									type="file"
									className="hidden"
									accept="image/*"
									onChange={(e) => onImageUpload(e)}
								/>
								<label htmlFor="file">
									<ImageUp className="w-14 h-14 text-white" />
								</label>
							</div>
						)}
					</div>
					{imageUpload && (
						<div className="flex p-2 gap-2 items-center">
							<FileCheck2 />
							{imageUpload?.name}
							<Button variant="outline" onClick={onChangeAvatar}>
								{isLoading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? (
									<>Processing ... </>
								) : (
									<>Change Avatar</>
								)}
							</Button>
						</div>
					)}
					{/* form*/}
					<div>
						<ProfileForm user={user} />
					</div>
				</div>
			) : (
				<ProfileSkeleton />
			)}
		</Container>
	);
}
