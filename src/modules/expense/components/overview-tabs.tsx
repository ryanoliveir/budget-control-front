import { Tabs, TabsList, TabsTrigger } from "@core/components/ui/tabs";
import CategoriesOverview from "./categories-overview";
import ResponsiblesOverview from "./responsible-overview";
import MonthsOverview from "./months-overview";

const OverviewTabs = () => {
	return (
		<Tabs defaultValue="categories" className="w-full">
			<TabsList className="grid w-full md:w-[300px] grid-cols-3">
				<TabsTrigger value="categories">Categorias</TabsTrigger>
				<TabsTrigger value="responsibles">Responsáveis</TabsTrigger>
				<TabsTrigger value="months">Meses</TabsTrigger>
			</TabsList>
			<CategoriesOverview />
			<ResponsiblesOverview />
			<MonthsOverview />
		</Tabs>
	);
};

export default OverviewTabs;
