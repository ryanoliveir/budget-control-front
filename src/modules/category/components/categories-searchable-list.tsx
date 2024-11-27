import {
	SearchableList,
	SearchableListEmpty,
	SearchableListGroup,
	SearchableListInput,
	SearchableListItem,
	SearchableListRoot,
} from "@core/components/ui/searchable-list";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "../services/types";
import { keyListCategories } from "../services/keys";
import { cn } from "../../core/lib/utils";
import type { SearchableListItemProps } from "@/modules/core/components/ui/searchable-list/searshable-list-item";

interface FilterSearchableListProps extends SearchableListItemProps {}

const CategoriesSearchableList = ({
	className,
	...props
}: FilterSearchableListProps) => {
	const { data: categories } = useQuery<Category[]>({
		queryKey: keyListCategories(),
	});

	return (
		<SearchableListRoot>
			<SearchableListInput placeholder="Selecionar categoria..." />
			<SearchableList>
				<SearchableListEmpty>Nenhuma categoria encontrada.</SearchableListEmpty>
				<SearchableListGroup>
					{categories?.map((category) => (
						<SearchableListItem
							className={cn("gap-2 hover:cursor-pointer", className)}
							key={category.id}
							value={String(category.id)}
							{...props}
						>
							{category.name}
						</SearchableListItem>
					))}
				</SearchableListGroup>
			</SearchableList>
		</SearchableListRoot>
	);
};

export default CategoriesSearchableList;
