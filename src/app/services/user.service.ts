import { PrismaService } from "./prisma.service";

const prisma = PrismaService.getInstance().init();

export const updateUserImage = async (userId: string, userImage: string) => {
	return await prisma.user.update({
		where: {
      id: userId,
    },
    data: {
      image: userImage,
    },
	});
};


export const findUserById = async (userId: string) => {
	return await prisma.user.findUnique({
		where: {
      id: userId,
    }
	});
};
