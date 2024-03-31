import { Post } from "@prisma/client";

export type PostDTO = {
  user: {
      name: string | null;
      image: string | null;
  };
} & Post