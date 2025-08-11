import type { FC, HTMLAttributes } from "react";
import { cn } from "@/utils/functions";

interface Props extends HTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: FC<Props> = ({ className, ...props }) => {
	return (
		<textarea
			className={cn(
				"bg-zinc-50 rounded-sm focus:bg-white focus:shadow focus:ring-0 focus:outline-none border border-zinc-200 focus:border-zinc-300 p-3 w-full min-h-[100px] resize-y placeholder:text-zinc-400",
				className,
			)}
			{...props}
		/>
	);
};
