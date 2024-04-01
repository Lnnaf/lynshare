import { addPost } from "@/services/post.service";
import { Post } from "@prisma/client";


export async function POST(req: Request) {
  const newPost: Post = await req.json();
  const result = await addPost(newPost)
  if (!result) {
    return Response.json({status: 'failed'});
  }
  return Response.json(result);
}