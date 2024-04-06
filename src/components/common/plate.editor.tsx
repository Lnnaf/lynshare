"use client";

import { withProps } from "@udecode/cn";
import {
	createPlugins,
	Plate,
	RenderAfterEditable,
	PlateLeaf,
	createPlateEditor,
} from "@udecode/plate-common";
import {
	createParagraphPlugin,
	ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";
import {
	createHeadingPlugin,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_H4,
	ELEMENT_H5,
	ELEMENT_H6,
} from "@udecode/plate-heading";
import {
	createBlockquotePlugin,
	ELEMENT_BLOCKQUOTE,
} from "@udecode/plate-block-quote";
import {
	createCodeBlockPlugin,
	ELEMENT_CODE_BLOCK,
	ELEMENT_CODE_LINE,
	ELEMENT_CODE_SYNTAX,
} from "@udecode/plate-code-block";
import {
	createHorizontalRulePlugin,
	ELEMENT_HR,
} from "@udecode/plate-horizontal-rule";
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link";
import {
	createImagePlugin,
	ELEMENT_IMAGE,
	createMediaEmbedPlugin,
	ELEMENT_MEDIA_EMBED,
} from "@udecode/plate-media";
import { createTogglePlugin, ELEMENT_TOGGLE } from "@udecode/plate-toggle";
import { createCaptionPlugin } from "@udecode/plate-caption";
import {
	createTablePlugin,
	ELEMENT_TABLE,
	ELEMENT_TR,
	ELEMENT_TD,
	ELEMENT_TH,
} from "@udecode/plate-table";
import { createTodoListPlugin, ELEMENT_TODO_LI } from "@udecode/plate-list";
import {
	createBoldPlugin,
	MARK_BOLD,
	createItalicPlugin,
	MARK_ITALIC,
	createStrikethroughPlugin,
	MARK_STRIKETHROUGH,
	createCodePlugin,
	MARK_CODE,
} from "@udecode/plate-basic-marks";
import {
	createFontColorPlugin,
	createFontBackgroundColorPlugin,
	createFontSizePlugin,
	createFontFamilyPlugin,
} from "@udecode/plate-font";
import {
	createHighlightPlugin,
	MARK_HIGHLIGHT,
} from "@udecode/plate-highlight";
import { createAlignPlugin, setAlign } from "@udecode/plate-alignment";
import { createIndentPlugin } from "@udecode/plate-indent";
import { createIndentListPlugin } from "@udecode/plate-indent-list";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { createAutoformatPlugin } from "@udecode/plate-autoformat";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import { createComboboxPlugin } from "@udecode/plate-combobox";
import { createDndPlugin } from "@udecode/plate-dnd";
import { createEmojiPlugin } from "@udecode/plate-emoji";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BlockquoteElement } from "@/components/plate-ui/blockquote-element";
import { CodeBlockElement } from "@/components/plate-ui/code-block-element";
import { CodeLineElement } from "@/components/plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "@/components/plate-ui/code-syntax-leaf";
import { HrElement } from "@/components/plate-ui/hr-element";
import { ImageElement } from "@/components/plate-ui/image-element";
import { LinkElement } from "@/components/plate-ui/link-element";
import { LinkFloatingToolbar } from "@/components/plate-ui/link-floating-toolbar";
import { ToggleElement } from "@/components/plate-ui/toggle-element";
import { HeadingElement } from "@/components/plate-ui/heading-element";
import { MediaEmbedElement } from "@/components/plate-ui/media-embed-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { TableElement } from "@/components/plate-ui/table-element";
import { TableRowElement } from "@/components/plate-ui/table-row-element";
import {
	TableCellElement,
	TableCellHeaderElement,
} from "@/components/plate-ui/table-cell-element";
import { TodoListElement } from "@/components/plate-ui/todo-list-element";
import { CodeLeaf } from "@/components/plate-ui/code-leaf";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { withPlaceholders } from "@/components/plate-ui/placeholder";
import { withDraggables } from "@/components/plate-ui/with-draggables";
import { EmojiCombobox } from "@/components/plate-ui/emoji-combobox";
import { TooltipProvider } from "../plate-ui/tooltip";
import { set } from "react-hook-form";
import { use, useEffect, useState } from "react";

export const plugins = createPlugins(
	[
		createParagraphPlugin(),
		createHeadingPlugin(),
		createBlockquotePlugin(),
		createCodeBlockPlugin(),
		createHorizontalRulePlugin(),
		createLinkPlugin({
			renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
		}),
		createImagePlugin(),
		createTogglePlugin(),
		createMediaEmbedPlugin(),
		createCaptionPlugin({
			options: {
				pluginKeys: [
					// ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
				],
			},
		}),
		createTablePlugin(),
		createTodoListPlugin(),
		createBoldPlugin(),
		createItalicPlugin(),
		createStrikethroughPlugin(),
		createCodePlugin(),
		createFontColorPlugin(),
		createFontBackgroundColorPlugin(),
		createFontSizePlugin(),
		createFontFamilyPlugin(),
		createHighlightPlugin(),
		createAlignPlugin({
			inject: {
				props: {
					validTypes: [
						ELEMENT_PARAGRAPH,
						ELEMENT_H1,
						ELEMENT_H2,
						ELEMENT_H3,
						ELEMENT_H4,
						ELEMENT_H5,
						ELEMENT_H6,
					],
				},
			},
		}),
		createIndentPlugin({
			inject: {
				props: {
					validTypes: [
						ELEMENT_PARAGRAPH,
						ELEMENT_H1,
						ELEMENT_H2,
						ELEMENT_H3,
						ELEMENT_BLOCKQUOTE,
						ELEMENT_CODE_BLOCK,
					],
				},
			},
		}),
		createIndentListPlugin({
			inject: {
				props: {
					validTypes: [
						ELEMENT_PARAGRAPH,
						ELEMENT_H1,
						ELEMENT_H2,
						ELEMENT_H3,
						ELEMENT_BLOCKQUOTE,
						ELEMENT_CODE_BLOCK,
					],
				},
			},
		}),
		createLineHeightPlugin({
			inject: {
				props: {
					defaultNodeValue: 1.5,
					validNodeValues: [1, 1.2, 1.5, 2, 3],
					validTypes: [
						ELEMENT_PARAGRAPH,
						ELEMENT_H1,
						ELEMENT_H2,
						ELEMENT_H3,
						ELEMENT_H4,
						ELEMENT_H5,
						ELEMENT_H6,
					],
				},
			},
		}),
		createAutoformatPlugin({
			options: {
				rules: [
					// Usage: https://platejs.org/docs/autoformat
				],
				enableUndoOnDelete: true,
			},
		}),
		createBlockSelectionPlugin({
			options: {
				sizes: {
					top: 0,
					bottom: 0,
				},
			},
		}),
		createComboboxPlugin(),
		createDndPlugin({
			options: { enableScroller: true },
		}),
		createEmojiPlugin({
			component: EmojiCombobox,
		}),
	],
	{
		components: withDraggables(
			withPlaceholders({
				[ELEMENT_BLOCKQUOTE]: BlockquoteElement,
				[ELEMENT_CODE_BLOCK]: CodeBlockElement,
				[ELEMENT_CODE_LINE]: CodeLineElement,
				[ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
				[ELEMENT_HR]: HrElement,
				[ELEMENT_IMAGE]: ImageElement,
				[ELEMENT_LINK]: LinkElement,
				[ELEMENT_TOGGLE]: ToggleElement,
				[ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
				[ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
				[ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
				[ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
				[ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
				[ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
				[ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
				[ELEMENT_PARAGRAPH]: ParagraphElement,
				[ELEMENT_TABLE]: TableElement,
				[ELEMENT_TR]: TableRowElement,
				[ELEMENT_TD]: TableCellElement,
				[ELEMENT_TH]: TableCellHeaderElement,
				[ELEMENT_TODO_LI]: TodoListElement,
				[MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
				[MARK_CODE]: CodeLeaf,
				[MARK_HIGHLIGHT]: HighlightLeaf,
				[MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
				[MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
			})
		),
	}
);

export function PlateEditor(prop: {
	onDataChange: (val: any) => void;
	data: any;
}) {
	
	useEffect(() => {
	}, [prop.data]);
	useState;
	return (
		<DndProvider backend={HTML5Backend}>
			<TooltipProvider>
				<Plate
					plugins={plugins}
					onChange={(val) => {
						prop.onDataChange(val);
					}}
				>
					<FixedToolbar>
						<FixedToolbarButtons />
					</FixedToolbar>
					<Editor />
					<FloatingToolbar>
						<FloatingToolbarButtons />
					</FloatingToolbar>
				</Plate>
			</TooltipProvider>
		</DndProvider>
	);
}
