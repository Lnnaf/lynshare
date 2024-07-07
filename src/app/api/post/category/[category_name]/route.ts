import { findPostByCategory, findPostsByUser, findPostsByUserAndNotPublished } from '@/services/post.service'
import { NextRequest } from 'next/server'

interface param {
  category_name: string
}
export async function GET(req: NextRequest, { params }: { params: param }) {
  const categoryName = params.category_name


  try {
    // Replace this with your actual function to get user by ID
    let posts = []
    posts = await findPostByCategory(categoryName)
    if (!posts) return Response.json(posts, { status: 204 })
    return Response.json(posts, { status: 200 })
  } catch (error) {
    return Response.json(
      { error: 'An error occurred while fetching the posts' },
      { status: 500 }
    )
  }
}
