import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateReview } from "@/hooks/mutations/useCreateReview";
import { toast } from "@/utils/toast";
import { Button } from "./commons/Button";
import { Dialog, DialogFooter, DialogHeader } from "./commons/Dialog";
import { Rating } from "./commons/Rating";
import { Textarea } from "./commons/Textarea";
import { SelectRestaurant } from "./SelectRestaurant";

const formSchema = z.object({
	restaurant: z
		.object({
			id: z.string(),
			name: z.string(),
			description: z.string().nullable(),
			avatar_url: z.string().nullable(),
			created_at: z.date(),
		})
		.nullable(),
	rating: z.number(),
	review: z.string().max(500),
});

export const ReviewDialog: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [step, setStep] = useState(1);

	const { control, reset, watch, register, handleSubmit } = useForm({
		defaultValues: {
			restaurant: null,
			rating: 0,
			review: "",
		},
		resolver: zodResolver(formSchema),
	});

	const restaurant = watch("restaurant");

	useEffect(() => {
		if (!isOpen) {
			setStep(1);
			reset();
		}
	}, [isOpen, reset]);

	const { mutate: createReview, isPending: isCreateReviewPending } =
		useCreateReview({
			onSuccess: () => {
				setIsOpen(false);
				reset();
				toast.success("Crítica criada com sucesso!");
			},
			onError: (err) => {
				toast.error(err.message, "Erro ao criar crítica");
			},
		});

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<div className="p-4">
						<Controller
							control={control}
							name="restaurant"
							render={({ field }) => (
								<SelectRestaurant
									value={field.value}
									onChange={(v) => {
										console.log(v);
										setStep(2);
										field.onChange(v);
									}}
								/>
							)}
						/>
					</div>
				);
			case 2:
				return (
					<>
						<div className="flex p-4 gap-4">
							<img
								src={restaurant?.avatar_url ?? ""}
								alt="restaurant selected to review"
								className="rounded-full size-24"
							/>
							<div className="flex flex-col gap-1 w-full">
								<span className="font-title font-bold text-2xl">
									{restaurant?.name}
								</span>
								{restaurant?.description && (
									<span className="text-sm text-zinc-500">
										{restaurant.description}
									</span>
								)}
								<Controller
									control={control}
									name="rating"
									render={({ field }) => (
										<Rating rating={field.value} onChange={field.onChange} />
									)}
								/>

								<Textarea className="min-h-32" {...register("review")} />
							</div>
						</div>
						<DialogFooter className="gap-2">
							<Button
								variant="primary"
								colorScheme="danger"
								onClick={() => setIsOpen(false)}
							>
								Cancelar
							</Button>
							<Button
								isLoading={isCreateReviewPending}
								onClick={() => {
									handleSubmit((data) => {
										createReview({
											restaurantId: data.restaurant!.id,
											rating: data.rating,
											review: data.review,
										});
									})();
								}}
							>
								Salvar
							</Button>
						</DialogFooter>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<Button
				onClick={() => {
					setIsOpen(true);
				}}
			>
				Nova Crítica
			</Button>
			<Dialog isOpen={isOpen} className="max-w-2xl w-full">
				<DialogHeader>
					<h1 className="font-title text-2xl font-bold">Criar Crítica</h1>

					<button
						type="button"
						className="cursor-pointer"
						onClick={() => setIsOpen(false)}
					>
						<X size={24} />
					</button>
				</DialogHeader>

				{renderStep()}
			</Dialog>
		</>
	);
};
