import { findPostsByUser, findPostsByUserAndNotPublished } from '@/services/post.service'
import { NextRequest } from 'next/server'

interface param {
  user_id: string
}
export async function GET(req: NextRequest, { params }: { params: param }) {
  const user_id = params.user_id
  var published = req.nextUrl.searchParams.get('published')
  if (!user_id) {
    return Response.json({ status: 'failed' }, { status: 400 })
  }

  try {
    // Replace this with your actual function to get user by ID
    let posts = []
    if (published === 'false') {
      posts = await findPostsByUser(user_id as string)
    } else {
      posts = await findPostsByUserAndNotPublished(user_id as string)
    }

    if (!posts) return Response.json(posts, { status: 204 })
    return Response.json(posts, { status: 200 })
  } catch (error) {
    return Response.json(
      { error: 'An error occurred while fetching the posts' },
      { status: 500 }
    )
  }
}
