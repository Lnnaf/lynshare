import { TElement, Value } from "@udecode/plate-common";
import escapeHtml from "escape-html";
import Prism from "prismjs";
import { Text } from "slate";

export const convertToHTML = (nodes: Value) => {
	return nodes.map((n: TElement) => serialize(n)).join("\n");
};

const serialize = (node: TElement): string => {
	if (Text.isText(node)) {
		let string = escapeHtml(node.text);
		if (node.bold) {
			string = `<strong>${string}</strong>`;
		}
		if (
			node.fontFamily ||
			node.fontSize ||
			node.color ||
			node.backgroundColor
		) {
			string = `<span style="${
				node.fontFamily && "font-family:" + node.fontFamily
			} 
      ${node.color && "color:" + node.color}
      ${node.backgroundColor && "background-color:" + node.backgroundColor}
      ${node.fontSize && "font-size:" + node.fontSize}
      ">${string}</span>`;
		}
		return string;
	}
	const children = node.children
		?.map((n) => serialize(n as TElement))
		.join("");

	switch (node.type) {
		case "blockquote":
			return `<blockquote class="italic my-1 border-l-2 pl-6"><p>${children}</p></blockquote>`;
		case "paragraph":
			return `<p>${children}</p>`;
		case "link":
			return `<a href="${escapeHtml(
				node.url as string
			)}">${children}</a>`;
		case "h1":
			return `<h1 class="mb-1 font-heading text-4xl font-bold mt-0" style="text-align:${node.align}" >${children}</h1>`;
		case "heading-two":
			return `<h2>${children}</h2>`;
		case "heading-three":
			return `<h3>${children}</h3>`;
		case "heading-four":
			return `<h4>${children}</h4>`;
		case "heading-five":
			return `<h5>${children}</h5>`;
		case "heading-six":
			return `<h6>${children}</h6>`;
		case "bulleted-list":
			return `<ul>${children}</ul>`;
		case "numbered-list":
			return `<ol>${children}</ol>`;
		case "list-item":
			return `<li>${children}</li>`;
		case "image":
			return `<img src="${escapeHtml(
				node.url as string
			)}" alt="${escapeHtml(node.text as string)}" />`;
		case "img":
			return `<figure class="group relative m-0">
            <div style="width:${node.width}px">
              <img src="${escapeHtml(node.url as string)}" alt="${escapeHtml(
				node.text as string
			)}" style="width:${node.width}px"/>
            </div>
            <figcaption class="flex justify-center" style="width:${
				node.width
			}px;">
              <p>${(node.caption as { text: string }[])[0].text}</p>
            </figcaption>
          </figure>`;
		case "video":
			return `<video controls src="${escapeHtml(
				node.url as string
			)}">${children}</video>`;
		case "audio":
			return `<audio controls src="${escapeHtml(
				node.url as string
			)}">${children}</audio>`;
		case "file":
			return `<a href="${escapeHtml(
				node.url as string
			)}" download>${children}</a>`;
		case "code":
			return `<pre><code>${children}</code></pre>`;
		case "code_block":
			console.log("children", children);

			const code = Prism.highlight(
				children,
				Prism.languages[node.lang as string],
				node.lang as string
			);
			return `<pre class="language-${escapeHtml(
				node.lang as string
			)}"><code class="language-${escapeHtml(
				node.lang as string
			)}">${code}</code></pre>`;
		default:
			return children;
	}
};
