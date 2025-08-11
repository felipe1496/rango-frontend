import { type Condition, conditionsToFilter } from "@/utils/condition";
import { api } from ".";

export const restaurantsService = {
	async list(props: { conditions?: Condition[] }) {
		return api
			.get<{
				restaurants: {
					id: string;
					name: string;
					description: string | null;
					avatar_url: string | null;
					created_at: Date;
				}[];
			}>("/restaurants", {
				params: {
					filter: conditionsToFilter(props.conditions),
				},
			})
			.then((response) => response.data);
	},
};
