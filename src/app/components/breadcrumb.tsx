"use client";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { getUrlPath } from "../utilities/url-urils";
import { toCapitalizeFirstChar } from "../utilities/string-utils";
import React from "react";

interface props {
	addtionalItems?: string[]
}
export default function BreadCrumb(props: props) {

	const pathname = usePathname();
	const paths = getUrlPath(pathname);
	paths.map(toCapitalizeFirstChar);
	
	if (props.addtionalItems) {
		paths.push.apply(props.addtionalItems)
	}
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				{paths.map((path, key) => {
					return (
						<React.Fragment key={key}>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{path}</BreadcrumbPage>
							</BreadcrumbItem>
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
