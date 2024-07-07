import prisma from "./prisma.service";

export const updateUserImage = (userId: string, userImage: string) => {
	return prisma.user.update({
		where: {
      id: userId,
    },
    data: {
      image: userImage,
    },
	});
};

export const updateUserName = (userId: string, userName: string) => {
	return prisma.user.update({
		where: {
      id: userId,
    },
    data: {
      name: userName,
      lastChangedName: new Date(),
    },
	});
};


export const findUserById = (userId: string) => {
	return prisma.user.findUnique({
		where: {
      id: userId,
    }
	});
};
