import React from "react";
import {
	MARK_BOLD,
	MARK_CODE,
	MARK_ITALIC,
	MARK_STRIKETHROUGH,
	MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";
import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ModeDropdownMenu } from "./mode-dropdown-menu";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";
import {
	Baseline,
	Bold,
	Code,
	Italic,
	PaintBucket,
	Strikethrough,
	Underline,
} from "lucide-react";
import {
	MARK_BG_COLOR,
	MARK_COLOR,
	MARK_FONT_SIZE,
	MARK_FONT_WEIGHT,
} from "@udecode/plate-font";
import { AlignDropdownMenu } from "./align-dropdown-menu";
import { EmojiDropdownMenu } from "./emoji-dropdown-menu";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { ListStyleType } from "@udecode/plate-indent-list";
import { IndentListToolbarButton } from "./indent-list-toolbar-button";
import { ColorDropdownMenu } from "./color-dropdown-menu";

export function FixedToolbarButtons() {
	const readOnly = useEditorReadOnly();

	return (
		<div className="w-full overflow-hidden">
			<div
				className="flex flex-wrap"
				style={{
					transform: "translateX(calc(-1px))",
				}}
			>
				{!readOnly && (
					<>
						<ToolbarGroup noSeparator>
							<InsertDropdownMenu />
							<TurnIntoDropdownMenu />
						</ToolbarGroup>

						<ToolbarGroup>
							<MarkToolbarButton
								tooltip="Bold (⌘+B)"
								nodeType={MARK_BOLD}
							>
								<Bold />
							</MarkToolbarButton>
							<MarkToolbarButton
								tooltip="Italic (⌘+I)"
								nodeType={MARK_ITALIC}
							>
								<Italic />
							</MarkToolbarButton>
							<MarkToolbarButton
								tooltip="Underline (⌘+U)"
								nodeType={MARK_UNDERLINE}
							>
								<Underline />
							</MarkToolbarButton>
							<MarkToolbarButton
								tooltip="Strikethrough (⌘+⇧+M)"
								nodeType={MARK_STRIKETHROUGH}
							>
								<Strikethrough />
							</MarkToolbarButton>
							<IndentListToolbarButton nodeType={ListStyleType.Disc}/>
							<IndentListToolbarButton nodeType={ListStyleType.Decimal}/>
							<ColorDropdownMenu nodeType={MARK_COLOR}>
								<Baseline />
							</ColorDropdownMenu>
							<ColorDropdownMenu nodeType={MARK_BG_COLOR}>
								<PaintBucket />
							</ColorDropdownMenu>
							<MarkToolbarButton
								tooltip="Code (⌘+E)"
								nodeType={MARK_CODE}
							>
								<Code />
							</MarkToolbarButton>

							<AlignDropdownMenu />
							<EmojiDropdownMenu />
							<MoreDropdownMenu />
						</ToolbarGroup>
					</>
				)}

				<div className="grow" />

				<ToolbarGroup noSeparator>
					<ModeDropdownMenu />
				</ToolbarGroup>
			</div>
		</div>
	);
}
