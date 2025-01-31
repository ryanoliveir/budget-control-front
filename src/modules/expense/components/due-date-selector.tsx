import { useState } from "react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../core/components/ui/form";
import { Button } from "../../core/components/ui/button";
import { CalendarIcon } from "lucide-react";
import Text from "../../core/components/ui/text";
import {
	ResponsivePopover,
	ResponsivePopoverContent,
	ResponsivePopoverTrigger,
} from "../../core/components/ui/responsive-popover";
import { Calendar } from "../../core/components/ui/calendar";
import { cn } from "../../core/lib/utils";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../core/components/ui/select";
import type { UseFormReturn } from "react-hook-form";
import type { ExpenseFormValues } from "../utils/expense-form-schema";

interface DueDateSelectorProps {
	form: UseFormReturn<ExpenseFormValues>;
	label?: string;
	className?: string;
	isMessageAbsolute?: boolean;
	disabled?: boolean;
}

const DueDateSelector = ({
	isMessageAbsolute = false,
	className,
	form,
	label,
	disabled,
}: DueDateSelectorProps) => {
	const [month, setMonth] = useState(new Date());

	return (
		<FormField
			control={form.control}
			name="dueDate"
			render={({ field }) => (
				<FormItem className="relative">
					{label && <FormLabel>{label}</FormLabel>}
					<ResponsivePopover modal>
						<ResponsivePopoverTrigger asChild>
							<FormControl>
								<Button
									variant={"outline"}
									className={cn(
										"w-[240px] pl-3 text-left font-normal",
										!field.value && "text-muted-foreground",
										className,
									)}
									disabled={disabled}
								>
									{field.value ? (
										format(field.value, "PPP", { locale: ptBR })
									) : (
										<span>Selecione a data</span>
									)}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</ResponsivePopoverTrigger>
						<ResponsivePopoverContent className="w-auto p-2" align="start">
							<Select
								onValueChange={(value) => {
									const date = addDays(new Date(), Number.parseInt(value));
									field.onChange(date);

									if (
										!form.getValues("status") &&
										!form.getValues("paymentDate")
									) {
										form.setValue("status", "Agendada");
									}

									setMonth(date);
								}}
							>
								<SelectTrigger>
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>
								<SelectContent position="popper">
									<SelectItem value="0">Hoje</SelectItem>
									<SelectItem value="1">Amanhã</SelectItem>
									<SelectItem value="3">Em 3 dias</SelectItem>
									<SelectItem value="7">Em uma semana</SelectItem>
									<SelectItem value="14">Em duas semanas</SelectItem>
									<SelectItem value="30">Em um mês</SelectItem>
									<SelectItem value="90">Em 3 meses</SelectItem>
								</SelectContent>
							</Select>
							<Calendar
								locale={ptBR}
								mode="single"
								month={month}
								onMonthChange={setMonth}
								selected={field.value}
								onSelect={(value) => {
									if (!form.getValues("paymentDate")) {
										form.setValue("status", "Agendada");
									}

									field.onChange(value);
								}}
								disabled={(date) => date < new Date("1900-01-01")}
								initialFocus
							/>
						</ResponsivePopoverContent>
					</ResponsivePopover>
					{form.getFieldState("dueDate").error && isMessageAbsolute ? (
						<div className="px-2 py-1 bg-background border rounded-full absolute transition-all left-0 right-0 mx-auto w-fit max-w-fit">
							<Text>
								<FormMessage className="text-xs opacity-75" />
							</Text>
						</div>
					) : (
						<FormMessage className="text-xs" />
					)}
				</FormItem>
			)}
		/>
	);
};

export default DueDateSelector;
