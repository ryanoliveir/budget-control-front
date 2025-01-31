import { forwardRef, type HTMLAttributes } from "react";
import type { ExpenseFormSchema } from "../utils/expense-form-schema";
import { useAddExpenseFormProvider } from "../context/add-expense-form-provider";
import { Form } from "../../core/components/ui/form";
import type { z } from "zod";
import { useAddExpense } from "../services";
import type { AddExpensePayload } from "../services/types";
import { toast } from "sonner";
import { queryClient } from "../../core/lib/react-query";
import {
	keyGetCategoriesExpensesTotal,
	keyGetMonthsExpensesTotal,
	keyGetUsersExpensesTotal,
	keyListExpenses,
} from "../services/keys";

interface FormWrapperProps extends HTMLAttributes<HTMLFormElement> {}

const FormWrapper = forwardRef<HTMLFormElement, FormWrapperProps>(
	({ children, ...props }, ref) => {
		const { isAddingExpense, addExpenseForm, setIsAddingExpense } =
			useAddExpenseFormProvider();
		const { mutate: addExpense } = useAddExpense();

		type FormSchemaType = z.infer<typeof ExpenseFormSchema>;

		const onSubmit = (values: FormSchemaType) => {
			const addExpensePayload: AddExpensePayload = { ...values };

			addExpense(
				{
					...addExpensePayload,
				},
				{
					onSuccess: () => {
						setIsAddingExpense(false);
						queryClient.invalidateQueries({
							queryKey: keyListExpenses(),
						});
						queryClient.invalidateQueries({
							queryKey: keyGetCategoriesExpensesTotal(),
						});
						queryClient.invalidateQueries({
							queryKey: keyGetUsersExpensesTotal(),
						});

						queryClient.invalidateQueries({
							queryKey: keyGetMonthsExpensesTotal(),
						});
						toast.success("Despesa adicionada com sucesso");

						addExpenseForm.reset();
					},
					onError: () => {
						toast.error("Erro ao adicionar despesa");
					},
				},
			);
		};

		if (isAddingExpense) {
			return (
				<Form {...addExpenseForm}>
					<form
						ref={ref}
						onSubmit={addExpenseForm.handleSubmit(onSubmit)}
						{...props}
						className="flex flex-col gap-4"
					>
						{children}
					</form>
				</Form>
			);
		}

		return <>{children}</>;
	},
);

export default FormWrapper;
