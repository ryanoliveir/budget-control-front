import type { HTMLAttributes } from "react";
import { cn } from "@core/lib/utils";

interface SideBarContentProps extends HTMLAttributes<HTMLDivElement> {}

export default function SideBarContent({
	children,
	className,
	...props
}: SideBarContentProps) {
	return (
		<div
			className={cn("flex h-full w-full grow flex-col", className)}
			{...props}
		>
			{children}
		</div>
	);
}
