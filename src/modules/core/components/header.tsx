import { forwardRef, type HTMLAttributes } from "react";
import { Button } from "@core/components/ui/button";
import { Menu } from "lucide-react";
import useMediaQuery from "@core/hooks/use-media-query";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@core/lib/utils";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
	sideBarCollapsed: boolean;
	onMenuToggleClick: (collapsed: boolean) => void;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(
	({ sideBarCollapsed, className, onMenuToggleClick, ...props }, ref) => {
		const isDesktop = useMediaQuery();
		// const logo = useLogo();

		const toggleCollapse = () => {
			onMenuToggleClick(!sideBarCollapsed);
		};

		return (
			<header
				ref={ref}
				className={cn(
					`sticky top-0 flex w-full items-center justify-between border-b bg-background/25 backdrop-blur transition-all dark:bg-background/95 ${
						isDesktop ? "px-2 py-2" : "px-2 py-2"
					}`,
					className,
				)}
				{...props}
			>
				<div className="flex w-1/3 items-center gap-2">
					{isDesktop && (
						<Button variant="ghost" size="icon" onClick={toggleCollapse}>
							<Menu />
						</Button>
					)}
				</div>

				<div className="flex w-1/3 items-center justify-end gap-1">
					<ThemeToggle />
				</div>
			</header>
		);
	},
);

export default Header;
