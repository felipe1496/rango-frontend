import { type HTMLAttributes, useEffect, useRef } from "react";
import { cn } from "@/utils/functions";
import type { FCC } from "@/utils/types";

interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
	isOpen: boolean;
}

export const Dialog: FCC<DialogProps> = ({
	children,
	isOpen,
	className,
	...props
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (dialogRef.current) {
			if (isOpen) {
				dialogRef.current.showModal();
			} else {
				dialogRef.current.close();
			}
		}
	}, [isOpen]);

	return (
		<dialog
			ref={dialogRef}
			className={cn("rounded-md shadow-md", className)}
			{...props}
		>
			{children}
		</dialog>
	);
};

interface DialogHeaderProps extends HTMLAttributes<HTMLElement> {}

export const DialogHeader: FCC<DialogHeaderProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<header
			className={cn(
				"border-b border-zinc-300 p-3 flex w-full justify-between",
				className,
			)}
			{...props}
		>
			{children}
		</header>
	);
};

interface DialogFooterProps extends HTMLAttributes<HTMLElement> {}

export const DialogFooter: FCC<DialogFooterProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<footer
			className={cn("bg-zinc-50 w-full p-2 flex justify-end", className)}
			{...props}
		>
			{children}
		</footer>
	);
};
