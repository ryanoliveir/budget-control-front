import type { HTMLAttributes } from "react";
import { Card, CardContent } from "../../../core/components/ui/card";
import ExpensesTable from "../expenses-table";
import AllExpensesHeader from "./all-expenses-header";

interface AllExpensesProps extends HTMLAttributes<HTMLDivElement> {}

const AllExpenses = ({ ...props }: AllExpensesProps) => {
	return (
		<Card {...props}>
			<AllExpensesHeader />
			<CardContent>
				<ExpensesTable />
			</CardContent>
		</Card>
	);
};

export default AllExpenses;
