import Text from "../../core/components/ui/text";
import ExpensesOverview from "../components/sections/overview";
import AllExpenses from "../components/sections/all-expenses";
import AddExpenseButton from "../components/add-expense-button";
import { AddExpenseFormProvider } from "../context/add-expense-form-provider";
import { EditExpenseFormProvider } from "../context/edit-expense-form-provider";

const ExpensesScreen = () => {
	return (
		<AddExpenseFormProvider>
			<EditExpenseFormProvider>
				<main className="min-h-svh h-fit bg-dark-pattern">
					<div className="bg-secondary/80 backdrop-blur w-full h-full min-h-svh p-3 md:p-6 space-y-6">
						<div className="flex items-end justify-between md:justify-start md:gap-5">
							<Text tag="h1">Despesas</Text>
							<AddExpenseButton variant="outline">Adicionar</AddExpenseButton>
						</div>
						<div className="space-y-4">
							<ExpensesOverview />
							<AllExpenses />
						</div>
					</div>
				</main>
			</EditExpenseFormProvider>
		</AddExpenseFormProvider>
	);
};

export default ExpensesScreen;
