import { forwardRef } from "react";
import { Button, type ButtonProps } from "../../core/components/ui/button";
import { useAddExpenseFormProvider } from "../context/add-expense-form-provider";

const AddExpenseButton = forwardRef<HTMLButtonElement, ButtonProps>(
	({ ...props }, ref) => {
		const { setIsAddingExpense } = useAddExpenseFormProvider();

		return (
			<Button ref={ref} {...props} onClick={() => setIsAddingExpense(true)} />
		);
	},
);

export default AddExpenseButton;
