import { CheckCheck, CircleX } from "lucide-react"
import { formatDate } from "./date-utils"

export const formatCellToDate = (value: Date) => {
  return formatDate(value)
}

export const formatCellBoolean = (value: boolean) => {
  return  value ? <CheckCheck className="text-green-500"/> : <CircleX className="text-red-500"/>
}