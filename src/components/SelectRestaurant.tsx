import { map } from "lodash";
import { type FC, useState } from "react";
import Select from "react-select";
import { useListRestaurants } from "@/hooks/queries/useListRestaurants";
import useDebounce from "@/hooks/useDebounce";
import { condition } from "@/utils/condition";
import { Image } from "./commons/Image";

type Restaurant = {
	id: string;
	name: string;
	description: string | null;
	avatar_url: string | null;
	created_at: Date;
};

interface Props {
	value: Restaurant | null;
	onChange?: (restaurant: Restaurant) => void;
	err?: string;
}

export const SelectRestaurant: FC<Props> = ({ value, onChange, err }) => {
	const [querySearch, setQuerySearch] = useState("");
	const debouncedQuerySearch = useDebounce(querySearch, 500);
	const conditions = debouncedQuerySearch
		? [condition("name", "like", debouncedQuerySearch)]
		: [];

	const { data, isPending } = useListRestaurants({
		conditions,
	});

	return (
		<>
			<span data-error={err}>Restaurante</span>
			<Select
				value={
					value
						? {
								label: (
									<div className="flex items-center">
										{value.avatar_url && (
											<Image
												fallback={
													<div className="size-6 rounded-full bg-zinc-100 relative mr-2">
														<span className="absolute inset-0 flex items-center justify-center">
															{value.name.split(" ")[0].charAt(0)}
														</span>
													</div>
												}
												src={value.avatar_url}
												alt={value.name}
												className="size-6 rounded-full mr-2"
											/>
										)}
										<span>{value.name}</span>
									</div>
								),
								value,
							}
						: null
				}
				onChange={(option) => {
					if (option?.value && onChange) {
						onChange(option.value);
					}
				}}
				options={
					map(data?.restaurants, (r) => ({
						label: (
							<div className="flex items-center">
								{r.avatar_url && (
									<Image
										fallback={
											<div className="size-6 rounded-full bg-zinc-100 relative mr-2">
												<span className="absolute inset-0 flex items-center justify-center">
													{r.name.split(" ")[0].charAt(0)}
												</span>
											</div>
										}
										src={r.avatar_url}
										alt={r.name}
										className="size-6 rounded-full mr-2"
									/>
								)}
								<span>{r.name}</span>
							</div>
						),
						value: r,
					})) ?? []
				}
				onInputChange={setQuerySearch}
				isLoading={isPending}
			/>
		</>
	);
};
