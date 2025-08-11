import type { FC } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";

export const Layout: FC = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<Outlet />
		</div>
	);
};
