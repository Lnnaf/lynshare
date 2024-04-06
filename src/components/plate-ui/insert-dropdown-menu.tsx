'use client';

import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import {
  focusEditor,
  insertEmptyElement,
  useEditorRef,
} from '@udecode/plate-common';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';
import { Code, Film, Heading1, Heading2, Heading3, Image, Link, List, ListOrdered, MessageSquare, MessageSquareQuote, Minus, SquarePlus, Table, WrapText } from 'lucide-react';
import { ELEMENT_CODE_BLOCK, insertEmptyCodeBlock } from '@udecode/plate-code-block';
import { KEY_LIST_STYLE_TYPE, toggleIndentList } from '@udecode/plate-indent-list';
import { ELEMENT_LINK, triggerFloatingLink, triggerFloatingLinkInsert } from '@udecode/plate-link';
import { toggleList } from '@udecode/plate-list';
import { ELEMENT_IMAGE, insertMedia, ELEMENT_MEDIA_EMBED } from '@udecode/plate-media';
import { ELEMENT_TABLE, insertTable } from '@udecode/plate-table';
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule';

const items = [
  {
    label: 'Basic blocks',
    items: [
      {
        value: ELEMENT_PARAGRAPH,
        label: 'Paragraph',
        description: 'Paragraph',
        icon: WrapText,
      },
      {
        value: ELEMENT_H1,
        label: 'Heading 1',
        description: 'Heading 1',
        icon: Heading1,
      },
      {
        value: ELEMENT_H2,
        label: 'Heading 2',
        description: 'Heading 2',
        icon: Heading2,
      },
      {
        value: ELEMENT_H3,
        label: 'Heading 3',
        description: 'Heading 3',
        icon: Heading3,
      },
      {
        value: ELEMENT_BLOCKQUOTE,
        label: 'Quote',
        description: 'Quote (⌘+⇧+.)',
        icon: MessageSquareQuote,
      },
      {
        value: ELEMENT_TABLE,
        label: 'Table',
        description: 'Table',
        icon: Table,
      },
      {
        value: ELEMENT_HR,
        label: 'Divider',
        description: 'Divider (---)',
        icon: Minus,
      },
     
    ],
  },
  {
    label: 'Media',
    items: [
      {
        value: ELEMENT_CODE_BLOCK,
        label: 'Code',
        description: 'Code (```)',
        icon: Code,
      },
      {
        value: ELEMENT_IMAGE,
        label: 'Image',
        description: 'Image',
        icon: Image,
      },
      {
        value: ELEMENT_MEDIA_EMBED,
        label: 'Embed',
        description: 'Embed',
        icon: Film,
      }
    ],
  },
  {
    label: 'Inline',
    items: [
      {
        value: ELEMENT_LINK,
        label: 'Link',
        description: 'Link',
        icon: Link,
      },
    ],
  },
];

export function InsertDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Insert" isDropdown>
          <SquarePlus />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="flex max-h-[500px] min-w-0 flex-col gap-0.5 overflow-y-auto"
      >
        {items.map(({ items: nestedItems, label }, index) => (
          <React.Fragment key={label}>
            {index !== 0 && <DropdownMenuSeparator />}

            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            {nestedItems.map(
              ({ value: type, label: itemLabel, icon: Icon }) => (
                <DropdownMenuItem
                  key={type}
                  className="min-w-[180px]"
                  onSelect={async () => {
                    switch (type) {
                      case ELEMENT_CODE_BLOCK: {
                        insertEmptyCodeBlock(editor);
                      
                        break;
                      }
                      case ELEMENT_IMAGE: {
                        await insertMedia(editor, { type: ELEMENT_IMAGE });
                      
                        break;
                      }
                      case ELEMENT_MEDIA_EMBED: {
                        await insertMedia(editor, {
                          type: ELEMENT_MEDIA_EMBED,
                        });
                      
                        break;
                      }
                      case ELEMENT_TABLE: {
                        insertTable(editor);
                      
                        break;
                      }
                      case ELEMENT_LINK: {
                        triggerFloatingLinkInsert(editor, { focused: true });
                      
                        break;
                      }
                      default: {
                        insertEmptyElement(editor, type, {
                          select: true,
                          nextBlock: true,
                        });
                      }
                    }

                    focusEditor(editor);
                  }}
                >
                  <Icon className="mr-2 size-5" />
                  {itemLabel}
                </DropdownMenuItem>
              )
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
