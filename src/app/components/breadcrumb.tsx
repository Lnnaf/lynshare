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

export default function BreadCrumb() {
	const pathname = usePathname();
	console.log(pathname);

	const paths = getUrlPath(pathname);
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				{paths.map((path, key) => {
					return (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbItem key={key}>
								<BreadcrumbPage>{toCapitalizeFirstChar(path)}</BreadcrumbPage>
							</BreadcrumbItem>
						</>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
