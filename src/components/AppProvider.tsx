import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
import type { User } from "@/services/authService";
import { env } from "@/utils/functions";
import type { FCC } from "@/utils/types";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

export const AppContext = createContext(
	{} as { user: User | null; setUser: (user: User | null) => void },
);

export const AppProvider: FCC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const loggedUser = localStorage.getItem("logged_user");
		if (loggedUser) {
			setUser(JSON.parse(loggedUser));
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<GoogleOAuthProvider clientId={env().VITE_GOOGLE_CLIENT_ID}>
				<AppContext.Provider value={{ user, setUser }}>
					<Toaster position="top-left" richColors />
					{children}
				</AppContext.Provider>
			</GoogleOAuthProvider>
		</QueryClientProvider>
	);
};
