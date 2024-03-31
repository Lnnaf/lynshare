import { ReactNode } from "react";
import BreadCrumb from "./breadcrumb";
interface props {
  children: ReactNode;
}

export default function Container({ children }: props) {
	return (
		<section className="lg:mx-auto max-w-[960px]">
			<div className="m-10">
				<BreadCrumb />
			</div>
      {children}
		</section>
	);
}
