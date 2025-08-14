import { useMutation } from "@tanstack/react-query";
import { reviewsService } from "@/services/reviewsService";
import type { MutationProps } from "@/utils/types";

export const useCreateReview = ({
	mutationKey = [],
	...props
}: MutationProps<typeof reviewsService.create> = {}) => {
	return useMutation({
		...props,
		mutationKey: ["create-review", ...mutationKey],
		mutationFn: reviewsService.create,
	});
};
