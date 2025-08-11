import { api } from ".";

export type User = {
	id: string;
	name: string;
	email: string;
	avatar_url: string;
	created_at: Date;
};

export const authService = {
	async googleSignIn(props: { bodyRequest: { access_token: string } }) {
		return api
			.post<{ user: User; access_token: string }>(
				"/auth/sign-in/google",
				props.bodyRequest,
			)
			.then((response) => response.data);
	},
};
