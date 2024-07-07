import { Post } from '@prisma/client'
import prisma from './prisma.service'

export const findPosts = async () => {
  return await prisma.post.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
}

export const findById = async (postId: number) => {
  return await prisma.post.findUnique({
    where: {
      id: postId
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
}

export const addPost = async (post: Post, categories: string[]) => {
  // Upsert topics (create if they don't exist)
  return await prisma.post.create({
    data: {
      ...post,
      categories: {
				create: categories.map((c) => ({ 
					category: {
						connectOrCreate: {
							where: {
								name: c
							},
							create: {
								name: c
							}
						}
					}
				})),
			}
    }
  })
}

export const findPostsByUser = async (userId: string) => {
  return await prisma.post.findMany({
    where: {
      author_id: userId
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
}

export const findPostsByUserAndNotPublished = async (userId: string) => {
  return await prisma.post.findMany({
    where: {
      author_id: userId,
      published: false
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        },
      },categories: {
				select: {
					category: {
						select: {
							name: true
						}
					}
				}
			}
    }
  })
}

export const findPostByCategory = async (category: string) => {
	return await prisma.post.findMany({
		where: {
			categories: {
				some: {
					category: {
						name: category
					}
				}
			}
		}
	})
}