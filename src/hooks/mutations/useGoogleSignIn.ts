import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import type { MutationProps } from "@/utils/types";

export const useGoogleSignIn = (
	props: MutationProps<typeof authService.googleSignIn>,
) =>
	useMutation({
		...props,
		mutationFn: authService.googleSignIn,
	});
