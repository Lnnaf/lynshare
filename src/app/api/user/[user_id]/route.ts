import { findUserById } from "@/services/user.service";
import { NextRequest } from "next/server";

interface param {
	user_id: string;
}
export async function GET(req: NextRequest, { params }: { params: param }) {
	const user_id = params.user_id;
	console.log(params);

	if (!user_id) {
		return Response.json({ status: "failed" }, { status: 400 });
	}

	try {
		// Replace this with your actual function to get user by ID
		const user = await findUserById(user_id as string);

		if (!user) {
			return Response.json({ status: "User not found" }, { status: 404 });
		}

		return Response.json(user, { status: 200 });
	} catch (error) {
		return Response.json(
			{ error: "An error occurred while fetching the user" },
			{ status: 500 }
		);
	}
}
