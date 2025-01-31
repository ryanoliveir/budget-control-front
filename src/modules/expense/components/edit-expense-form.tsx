import { useForm } from "react-hook-form";
import { useExpenseContext } from "../context/expense-provider";
import {
	ExpenseFormSchema,
	type ExpenseFormValues,
} from "../utils/expense-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../core/components/ui/form";
import {
	ResponsiveDialogAction,
	ResponsiveDialogCancel,
	ResponsiveDialogFooter,
} from "../../core/components/ui/responsive-dialog";
import { Button } from "../../core/components/ui/button";
import Text from "../../core/components/ui/text";
import { cn } from "../../core/lib/utils";
import { moneyMask } from "../utils/helpers";
import CategorySelectField from "../../category/components/category-select-field";
import DueDateInput from "./due-date-selector";
import PaymentDateSelector from "./payment-date-selector";
import { useEditExpense } from "../services";
import { Input } from "../../core/components/ui/input";
import StatusSelectField from "./status-select-field";

interface EditExpenseFormProps {
	onClose: () => void;
}

const EditExpenseForm = ({ onClose }: EditExpenseFormProps) => {
	const { expense } = useExpenseContext();
	const { mutate: editExpense, isPending: isEditingExpense } = useEditExpense(
		expense.id,
	);

	const editExpenseForm = useForm<ExpenseFormValues>({
		resolver: zodResolver(ExpenseFormSchema),
		mode: "onSubmit",
		defaultValues: {
			name: expense.name,
			value: Number.parseFloat(expense.value.toString()),
			status: expense.status,
			category: expense.category,
			dueDate: new Date(expense.dueDate),
			paymentDate: new Date(expense.paymentDate),
		},
	});

	const onSubmit = (values: ExpenseFormValues) => {
		const currentExpense: ExpenseFormValues = {
			name: expense.name,
			value: expense.value,
			status: expense.status,
			category: expense.category,
			dueDate: new Date(expense.dueDate),
			paymentDate: new Date(expense.paymentDate),
		};

		if (values === currentExpense) {
			return;
		}

		editExpense(values, {
			onSuccess: () => {
				onClose();
			},
		});
	};

	return (
		<Form {...editExpenseForm}>
			<form
				onSubmit={editExpenseForm.handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<div className="grid gap-4">
					<FormField
						control={editExpenseForm.control}
						name="name"
						render={({ field }) => (
							<FormItem className="relative">
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input {...field} type="text" />
								</FormControl>
								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>

					<FormField
						control={editExpenseForm.control}
						name="value"
						render={({ field }) => (
							<FormItem className="relative">
								<FormLabel>Valor</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="text"
										defaultValue={moneyMask(expense.value.toString())}
										onChange={(event) => {
											const input: HTMLInputElement = event.target;
											input.value = moneyMask(input.value);

											field.onChange(input.value);
										}}
									/>
								</FormControl>
								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>

					<StatusSelectField
						className="w-full justify-between"
						form={editExpenseForm}
						label="Categoria"
						disabled={isEditingExpense}
						badge
					/>

					<CategorySelectField
						className="w-full justify-between"
						form={editExpenseForm}
						label="Categoria"
						disabled={isEditingExpense}
					/>
					<DueDateInput
						form={editExpenseForm}
						label="Data de vencimento"
						className="w-full"
						disabled={isEditingExpense}
					/>
					<PaymentDateSelector
						form={editExpenseForm}
						label="Data de pagamento"
						className="w-full"
						disabled={isEditingExpense}
					/>
				</div>
				<ResponsiveDialogFooter className=" flex-col-reverse md:flex-row p-0">
					<ResponsiveDialogCancel
						asChild
						onClick={(e) => {
							e.preventDefault();
							onClose();
						}}
						disabled={isEditingExpense}
					>
						<Button variant="outline">Fechar</Button>
					</ResponsiveDialogCancel>
					<ResponsiveDialogAction asChild disabled={isEditingExpense}>
						<Button type="submit" className={cn("gap-1")}>
							<Text>Confirmar</Text>
						</Button>
					</ResponsiveDialogAction>
				</ResponsiveDialogFooter>
			</form>
		</Form>
	);
};

export default EditExpenseForm;
