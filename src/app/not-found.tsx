'use client'
import { ErrorType } from "@/models/http-code-error-type";
import ErrorComponent from "../components/layouts/error";

export default function NotFound() {
	return (
		<ErrorComponent erorrType={ErrorType[404]} />
	);
}
