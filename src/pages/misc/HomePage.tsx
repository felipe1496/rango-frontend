import type { FC } from "react";
import { Divider } from "@/components/commons/Divider";
import { ReviewDialog } from "@/components/ReviewDialog";
import { useAuth } from "@/hooks/useAuth";

export const HomePage: FC = () => {
	const { loggedUser } = useAuth();

	return (
		<main className="flex flex-col items-center justify-center">
			{loggedUser && (
				<div className="max-w-4xl w-full flex flex-col items-center justify-center">
					<div className="flex items-center justify-between w-full mt-4">
						<h2 className="text-2xl font-bold font-title">Suas Críticas</h2>

						<ReviewDialog />
					</div>

					<Divider className="bg-zinc-200 my-4" />
				</div>
			)}
		</main>
	);
};
