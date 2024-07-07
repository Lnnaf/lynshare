import { PostRequest } from "@/models/post.request";
import { addPost, findPosts } from "@/services/post.service";
import { Post } from "@prisma/client";


export async function POST(req: Request) {
  console.log('POST /api/post');
  
  
  const postReq: PostRequest = await req.json();
  console.log(postReq);
  const result = await addPost(postReq as unknown as Post, postReq.categories)
  if (!result) {
    return Response.json({status: 'failed'});
  }
  return Response.json(result);
}
