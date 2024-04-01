import { Post } from "@prisma/client";
import { PrismaService } from "./prisma.service";

const prisma = PrismaService.getInstance().client();

export const getAllPosts = async () => {
	return await prisma.post.findMany({
		include: {
			user: {
				select: {
					name: true,
					image: true,
				},
			},
		},
	});
};

export const findById = async (postId: number) => {
	return await prisma.post.findUnique({
		where: {
			id: postId,
		},
		include: {
			user: {
				select: {
					name: true,
					image: true,
				},
			},
		},
	});
};

export const addPost = async (post: Post) => {
	return await prisma.post.create({
		data: post,
	});
};
