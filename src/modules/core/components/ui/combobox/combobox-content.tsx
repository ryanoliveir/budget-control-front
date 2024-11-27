import useMediaQuery from "@core/hooks/use-media-query";
import type { ComponentPropsWithoutRef } from "react";
import type * as PopoverPrimitive from "@radix-ui/react-popover";
import type { Drawer as DrawerPrimitive } from "vaul";
import { PopoverContent } from "../popover";
import { DrawerContent } from "../drawer";

type ComboboxTriggerProps =
	| ({
			device?: "desktop";
	  } & ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>)
	| ({
			device?: "mobile";
	  } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>);

const ComboboxRoot = ({ ...props }: ComboboxTriggerProps) => {
	props.device = useMediaQuery() ? "desktop" : "mobile";

	switch (props.device) {
		case "desktop":
			return <PopoverContent {...props} />;
		case "mobile":
			return <DrawerContent {...props} />;
	}
};

export default ComboboxRoot;
