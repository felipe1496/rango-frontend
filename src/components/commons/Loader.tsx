import type { HTMLAttributes } from "react";
import { cn } from "@/utils/functions";

interface Props extends HTMLAttributes<HTMLDivElement> {
	size?: "sm" | "md" | "lg";
}

export const Loader = ({ className, size = "md", ...props }: Props) => {
	const sizeClasses = {
		sm: "size-4",
		md: "size-7",
		lg: "size-9",
	};

	return (
		<div
			className={cn(
				"border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin",
				sizeClasses[size],
				className,
			)}
			{...props}
		/>
	);
};
