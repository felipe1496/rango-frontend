import { type FC, useState } from "react";
import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../commons/DropdownMenu";
import { Image } from "../commons/Image";

export const Header: FC = () => {
	const { loggedUser, onLogout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="p-4 w-screen h-16 border-b border-zinc-200 flex items-center justify-center">
			<div className="max-w-4xl w-full flex justify-between items-center">
				<h1 className="text-3xl font-title font-bold">Rango Crítico</h1>

				<div>
					{loggedUser ? (
						<DropdownMenu
							position="bottom-left"
							isOpen={isOpen}
							onMouseEnter={() => setIsOpen(true)}
							onMouseLeave={() => setIsOpen(false)}
						>
							<DropdownMenuTrigger asChild>
								<Image
									fallback={
										<div className="size-12 rounded-full bg-zinc-100 relative">
											<span className="absolute inset-0 flex items-center justify-center">
												{loggedUser.name.split(" ")[0].charAt(0)}
											</span>
										</div>
									}
									src={loggedUser.avatar_url}
									alt="Profile"
									referrerPolicy="no-referrer"
									className="size-12 rounded-full"
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-48">
								<DropdownMenuItem
									onClick={() => {
										setIsOpen(false);
										onLogout();
									}}
									className="text-red-500 hover:bg-red-50"
								>
									Sair
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link to={ROUTES.AUTH.SIGN_IN} className="hover:underline">
							Entrar
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};
