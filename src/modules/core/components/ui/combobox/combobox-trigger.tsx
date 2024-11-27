import useMediaQuery from "@core/hooks/use-media-query";
import type { ComponentPropsWithoutRef } from "react";
import type * as PopoverPrimitive from "@radix-ui/react-popover";
import type { Drawer as DrawerPrimitive } from "vaul";
import { PopoverTrigger } from "../popover";
import { DrawerTrigger } from "../drawer";

type ComboboxTriggerProps =
	| ({
			device?: "desktop";
	  } & ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>)
	| ({
			device?: "mobile";
	  } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>);

const ComboboxRoot = ({ ...props }: ComboboxTriggerProps) => {
	props.device = useMediaQuery() ? "desktop" : "mobile";

	switch (props.device) {
		case "desktop":
			return <PopoverTrigger {...props} />;
		case "mobile":
			return <DrawerTrigger {...props} />;
	}
};

export default ComboboxRoot;
