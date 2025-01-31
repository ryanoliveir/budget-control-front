import { TableCell } from "@core/components/ui/table";
import { forwardRef, type ReactNode, type TdHTMLAttributes } from "react";

interface DataTableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
	children: ReactNode;
	cellWidth?: number;
	cellMinWidth?: number | undefined;
}

const DataTableCell = forwardRef<HTMLTableCellElement, DataTableCellProps>(
	({ children, cellWidth, cellMinWidth, className, style, ...props }, ref) => (
		<TableCell
			ref={ref}
			className={className}
			style={{ ...style, width: cellWidth, minWidth: cellMinWidth }}
			{...props}
		>
			{children}
		</TableCell>
	),
);

export default DataTableCell;
