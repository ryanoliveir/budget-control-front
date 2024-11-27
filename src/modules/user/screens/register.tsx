import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@core/components/ui/card";
import { Link } from "react-router-dom";
import RegisterForm from "../components/register-form";

const RegisterScreen = () => {
	return (
		<div className="min-h-svh w-screen flex justify-center items-center">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Criar conta</CardTitle>
					<CardDescription>
						Insira suas informações para criar a conta
					</CardDescription>
				</CardHeader>
				<CardContent>
					<RegisterForm />
					<div className="mt-4 text-center text-sm">
						Já tem uma conta?{" "}
						<Link to="/login" className="underline">
							Entrar
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default RegisterScreen;
