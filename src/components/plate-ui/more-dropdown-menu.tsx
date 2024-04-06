import React from "react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { MARK_SUBSCRIPT, MARK_SUPERSCRIPT } from "@udecode/plate-basic-marks";
import { focusEditor, toggleMark, useEditorRef } from "@udecode/plate-common";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";
import { Ellipsis, Subscript, Superscript } from "lucide-react";
import { ListStyleType } from "@udecode/plate-indent-list";
import { IndentListToolbarButton } from "./indent-list-toolbar-button";

export function MoreDropdownMenu(props: DropdownMenuProps) {
	const editor = useEditorRef();
	const openState = useOpenState();

	return (
		<DropdownMenu modal={false} {...openState} {...props}>
			<DropdownMenuTrigger asChild>
				<ToolbarButton pressed={openState.open} tooltip="Insert">
					<Ellipsis />
				</ToolbarButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="start"
				className="flex max-h-[500px] min-w-[180px] flex-col gap-0.5 overflow-y-auto"
			>
				<DropdownMenuItem
					onSelect={() => {
						toggleMark(editor, {
							key: MARK_SUBSCRIPT,
							clear: MARK_SUPERSCRIPT,
						});
						focusEditor(editor);
					}}
				>
					<Superscript className="mr-2 size-5" />
					Superscript
					{/* (⌘+,) */}
				</DropdownMenuItem>
				<DropdownMenuItem
					onSelect={() => {
						toggleMark(editor, {
							key: MARK_SUPERSCRIPT,
							clear: MARK_SUBSCRIPT,
						});
						focusEditor(editor);
					}}
				>
					<Subscript className="mr-2 size-5" />
					Subscript
					{/* (⌘+.) */}
				</DropdownMenuItem>
				<DropdownMenuItem >
					<IndentListToolbarButton  nodeType={ListStyleType.Decimal} />
          Ordered List
				</DropdownMenuItem>
				<DropdownMenuItem>
					<IndentListToolbarButton nodeType={ListStyleType.Disc} />
          Bulleted List
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
