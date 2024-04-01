import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
	return (
		<div className="flex flex-col">
			<Skeleton className="h-60 w-60 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
			<div className="pt-10 flex flex-col gap-10">
				<div>
					<Skeleton className="h-6 w-[150px] mb-2" />
					<Skeleton className="h-10 w-[550px]" />
				</div>
				<div>
					<Skeleton className="h-6 w-[150px] mb-2" />
					<Skeleton className="h-10 w-[550px]" />
				</div>
				<div>
					<Skeleton className="h-6 w-[150px] mb-2" />
					<Skeleton className="h-10 w-[550px]" />
				</div>
				<div>
					<Skeleton className="h-6 w-[150px] mb-2" />
					<Skeleton className="h-10 w-[550px]" />
				</div>
			</div>
		</div>
	);
}
