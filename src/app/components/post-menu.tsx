import { FunctionComponent } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface PostMenuProps {}

const PostMenu: FunctionComponent<PostMenuProps> = () => {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger>Is it accessible?</AccordionTrigger>
				<AccordionContent>
					Yes. It adheres to the WAI-ARIA design pattern.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default PostMenu;
