"use client"

import { formatCellBoolean, formatCellToDate as formatCellDate } from "@/lib/table-utils"
import { PostDTO } from "@/models/post"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<PostDTO>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "user.name",
    header: "Author",

  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell(props) {
      return formatCellDate(props.getValue() as Date)
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last modified",
    cell(props) {
      return formatCellDate(props.getValue() as Date)
    }
  },
  {
    accessorKey: "published",
    header: "Published",
    cell(props) {
      return formatCellBoolean(props.getValue() as boolean)
    }
  },
]
