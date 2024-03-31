import { updateUserImage } from "@/app/services/user.service";


export async function PUT(req: Request) {
  const reqData: {user_id: string, user_image: string } = await req.json();
  const result = await updateUserImage(reqData.user_id, reqData.user_image)
  
  if (!result) {
    return Response.json({status: 'failed'});
  }
  return Response.json(result);
}