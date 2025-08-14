import { api } from ".";

export const reviewsService = {
	async create(props: {
		restaurantId: string;
		rating: number;
		review: string;
	}) {
		return api
			.post<{
				review: {
					id: string;
					restaurant_id: string;
					rating: number;
					review: string;
					created_at: Date;
				};
			}>("/reviews", {
				restaurant_id: props.restaurantId,
				rating: props.rating,
				review: props.review,
			})
			.then((response) => response.data);
	},
};
