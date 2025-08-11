import type { FC } from "react";
import { Route, Routes } from "react-router";
import { ROUTES } from "@/constants/routes";
import { HomePage } from "@/pages/misc/HomePage";
import { Layout } from "./components/layout";
import { SignInPage } from "./pages/auth/SignInPage";

const App: FC = () => (
	<Routes>
		<Route element={<Layout />}>
			<Route index element={<HomePage />} />
		</Route>
		<Route path={ROUTES.AUTH.SIGN_IN} element={<SignInPage />} />
	</Routes>
);

export default App;
