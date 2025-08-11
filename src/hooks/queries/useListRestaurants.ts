import { useQuery } from "@tanstack/react-query";
import { restaurantsService } from "@/services/restaurantsService";
import type { QueryProps } from "@/utils/types";

export const useListRestaurants = ({
	queryKey = [],
	conditions,
	...props
}: QueryProps<typeof restaurantsService.list>) =>
	useQuery({
		...props,
		queryKey: ["restaurants", conditions, ...queryKey],
		queryFn: () => restaurantsService.list({ conditions }),
	});
