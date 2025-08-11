import { useContext } from "react";
import { AppContext } from "@/components/AppProvider";
import type { User } from "@/services/authService";

export const useAuth = () => {
	const ctx = useContext(AppContext);

	if (!ctx) {
		throw new Error("useAuth must be used within an AppProvider");
	}

	const onLogin = (user: User, accessToken: string) => {
		localStorage.setItem("logged_user", JSON.stringify(user));
		localStorage.setItem("access_token", accessToken);
		ctx.setUser(user);
	};

	const onLogout = () => {
		localStorage.removeItem("logged_user");
		localStorage.removeItem("access_token");
		ctx.setUser(null);
	};

	return { onLogin, onLogout, loggedUser: ctx.user };
};
