import type { ButtonHTMLAttributes, FC } from "react";
import { cn } from "@/utils/functions";
import { Loader } from "./Loader";

type Variant = "primary" | "outlined";

const variantStyles: Record<
	Variant,
	{
		default: string;
		danger: string;
	}
> = {
	primary: {
		default:
			"text-white bg-gradient-to-b from-emerald-400 to-emerald-600 text-shadow-sm border border-emerald-500",
		danger:
			"text-white bg-gradient-to-b from-red-400 to-red-600 text-shadow-sm border border-red-500",
	},
	outlined: {
		default: "border border-zinc-300 hover:bg-zinc-100",
		danger: "border border-red-300 hover:bg-red-50 text-red-500",
	},
} as const;

const sizeStyles = {
	sm: "px-2 py-1",
	md: "px-3 py-1",
	lg: "px-6 py-3",
} as const;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	size?: "sm" | "md" | "lg";
	colorScheme?: "default" | "danger";
	asChild?: boolean;
	isLoading?: boolean;
}
export const Button: FC<Props> = ({
	type = "button",
	className,
	variant = "primary",
	size = "md",
	colorScheme = "default",
	asChild,
	isLoading = false,
	children,
	disabled,
	...props
}) => {
	return (
		<button
			className={cn(
				"cursor-pointer rounded-sm relative inline-flex items-center justify-center",
				variantStyles[variant][colorScheme],
				sizeStyles[size],
				className,
			)}
			type={type}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? <Loader size={size} /> : children}
		</button>
	);
};
