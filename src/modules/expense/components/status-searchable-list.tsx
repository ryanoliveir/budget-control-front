import {
	SearchableList,
	SearchableListEmpty,
	SearchableListGroup,
	SearchableListInput,
	SearchableListItem,
	SearchableListRoot,
} from "@core/components/ui/searchable-list";
import { cn } from "../../core/lib/utils";
import { status } from "../utils/expense-status";
import { StatusBadge, type StatusBadgeVariant } from "./status-badge";
import type { SearchableListItemProps } from "@/modules/core/components/ui/searchable-list/searshable-list-item";

interface FilterSearchableListProps extends SearchableListItemProps {}

const StatusSearchableList = ({
	className,
	...props
}: FilterSearchableListProps) => {
	return (
		<SearchableListRoot>
			<SearchableListInput placeholder="Selecionar status..." />
			<SearchableList>
				<SearchableListEmpty>Nenhum status encontrado.</SearchableListEmpty>
				<SearchableListGroup>
					{status?.map((status) => (
						<SearchableListItem
							className={cn("gap-2 hover:cursor-pointer", className)}
							key={status.id}
							value={String(status.id)}
							{...props}
						>
							<StatusBadge
								status={status}
								variant={status.color as StatusBadgeVariant}
							/>
						</SearchableListItem>
					))}
				</SearchableListGroup>
			</SearchableList>
		</SearchableListRoot>
	);
};

export default StatusSearchableList;
