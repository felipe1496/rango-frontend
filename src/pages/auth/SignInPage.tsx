import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/commons/Button";
import { useGoogleSignIn } from "@/hooks/mutations/useGoogleSignIn";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/utils/toast";

export const SignInPage = () => {
	const [isGoogleLoginLoading, setIsGoogleLoginLoading] = useState(false);
	const navigate = useNavigate();
	const { onLogin } = useAuth();

	const googleLogin = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			googleSignIn({
				bodyRequest: {
					access_token: tokenResponse.access_token,
				},
			});
		},
		onError: () => {
			setIsGoogleLoginLoading(false);
			toast.error("Ocorreu um erro ao fazer login com o Google");
		},
	});

	const { mutate: googleSignIn, isPending: isGoogleSignInPending } =
		useGoogleSignIn({
			onSuccess: ({ user, access_token }) => {
				toast.success("Login realizado com sucesso");
				onLogin(user, access_token);
				navigate("/");
			},
			onError: () => {
				setIsGoogleLoginLoading(false);
				toast.error("Ocorreu um erro ao fazer login com o Google");
			},
			onSettled: () => {
				setIsGoogleLoginLoading(false);
			},
		});

	const isLoading = isGoogleLoginLoading || isGoogleSignInPending;

	return (
		<main className="flex flex-col items-center justify-center w-screen">
			<h1 className="text-2xl font-bold font-title mt-16">
				Entrar em Rango Crítico
			</h1>

			<Button
				isLoading={isLoading}
				variant="outlined"
				className="mt-4"
				onClick={() => {
					setIsGoogleLoginLoading(true);
					googleLogin();
				}}
			>
				<img src="/google_24.png" alt="Google" className="size-4 mr-2" />
				Entrar Com o Google
			</Button>
		</main>
	);
};
