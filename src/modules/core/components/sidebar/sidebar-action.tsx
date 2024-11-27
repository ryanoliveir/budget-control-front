import { cn } from "@core/lib/utils";
import { buttonVariants } from "@core/components/ui/button";
import Text from "@core/components/ui/text";
import { Button, type ButtonProps } from "../ui/button";
import type { LucideIcon } from "lucide-react";

interface SidebarActionProps extends ButtonProps {
	title: string;
	label?: string;
	Icon: LucideIcon;
}

const SidebarAction = ({
	size = "sm",
	variant = "default",
	title,
	label,
	Icon,
	className,
	...props
}: SidebarActionProps) => {
	return (
		<Button
			className={cn(
				buttonVariants({ variant: variant, size: size }),
				variant === "default" && "dark:text-white dark:hover:text-white",
				"justify-start hover:cursor-pointer rounded-full",
				size === "icon" && "justify-center",
				className,
			)}
			{...props}
		>
			<Icon
				className={`${size === "icon" ? "" : "mr-2"} h-4 min-h-4 w-4 min-w-4`}
			/>
			<div
				className={`${
					size === "icon" ? "" : "grow"
				} flex  items-center justify-between overflow-hidden`}
			>
				<Text
					className={`overflow-hidden ${size === "icon" ? "sr-only" : ""} `}
				>
					{title}
				</Text>
				{label && (
					<span
						className={cn(
							"ml-auto",
							variant === "default" && "text-background dark:text-white",
						)}
					>
						{label}
					</span>
				)}
			</div>
		</Button>
	);
};

export default SidebarAction;
