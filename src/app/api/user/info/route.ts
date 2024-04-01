import { findUserById, updateUserName } from "@/services/user.service";

/**
 * Handles the PUT request for updating user information.
 * @param req - The request object containing the user ID and name to be updated.
 * @returns A JSON response indicating the status of the update operation.
 */
export async function PUT(req: Request) {
	const reqData: { user_id: string; name: string } = await req.json();

	if (!reqData.user_id || !reqData.name) {
		return Response.json({ status: "param not valid" }, { status: 400 });
	}

	const user = await findUserById(reqData.user_id); 

	if (!user) {
		return Response.json({ status: "user not found" }, { status: 400 });
	}

	if (user.name === reqData.name) {    
		return Response.json({ status: "no update" }, { status: 201 });
	}

	if (user.lastChangedName && new Date().getTime() - user.lastChangedName.getTime() < 1000 * 60 * 60 * 24 * 30) {    
		return Response.json({ status: "too frequent" }, { status: 201 });
	}

	const result = await updateUserName(reqData.user_id, reqData.name);

	if (!result) {
		return Response.json({ status: "failed" }, { status: 400 });
	}

	return Response.json(result)
}