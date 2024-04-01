'use client'

import { ErrorType } from "@/models/http-code-error-type"
import ErrorComponent from "../components/layouts/error"

export default function Error() {
  return  <ErrorComponent erorrType={ErrorType[500]} />
}