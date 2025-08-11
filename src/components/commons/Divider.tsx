import type { FC, HTMLAttributes } from "react";
import { cn } from "@/utils/functions";

type Horizontal = HTMLAttributes<HTMLDivElement> & {
	horizontal?: true;
	vertical?: false;
	size?: number;
};

type Vertical = HTMLAttributes<HTMLDivElement> & {
	vertical?: true;
	horizontal?: false;
	size?: number;
};

type Props = Horizontal | Vertical;

export const Divider: FC<Props> = ({
	horizontal,
	vertical,
	size = 1,
	className,
}) => {
	const orientation =
		!horizontal && !vertical
			? "horizontal"
			: vertical
				? "vertical"
				: "horizontal";

	return (
		<div
			style={{
				width: orientation === "horizontal" ? "100%" : size,
				height: orientation === "vertical" ? "100%" : size,
			}}
			className={cn("bg-zinc-200 rounded-full", className)}
		/>
	);
};
