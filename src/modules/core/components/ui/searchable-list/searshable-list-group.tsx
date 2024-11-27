import { CommandGroup } from "@core/components/ui/command";
import { cn } from "@core/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Command as CommandPrimitive } from "cmdk";

interface SearchableListGroupProps
	extends ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {
	children: ReactNode;
}

const SearchableListGroup = ({
	children,
	className,
	...props
}: SearchableListGroupProps) => {
	return (
		<CommandGroup className={cn("", className)} {...props}>
			{children}
		</CommandGroup>
	);
};

export default SearchableListGroup;
