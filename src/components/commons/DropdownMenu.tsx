import { Slot } from "@radix-ui/react-slot";
import { createContext, type HTMLAttributes, useContext } from "react";
import { cn } from "@/utils/functions";
import type { FCC } from "@/utils/types";

const positionClasses = {
	top: "bottom-full",
	"top-left": "bottom-full left-0",
	"top-right": "bottom-full right-0",
	bottom: "top-full right-1/2 translate-x-1/2",
	"bottom-right": "top-full left-0",
	"bottom-left": "top-full right-0",
	left: "right-full top-1/2 translate-y-[-50%]",
	"left-top": "right-full bottom-full",
	"left-bottom": "right-full top-full",
	right: "left-full top-1/2 translate-y-[-50%]",
	"right-top": "left-full bottom-full",
	"right-bottom": "left-full top-full",
};

interface DropdownMenuProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	isOpen: boolean;
	position?: keyof typeof positionClasses;
}

type DropdownMenuContextType = {
	isOpen: boolean;
	position: keyof typeof positionClasses;
};

const DropdownMenuContext = createContext({} as DropdownMenuContextType);

const useDropdownMenuContext = () => {
	const ctx = useContext(DropdownMenuContext);

	if (!ctx) {
		throw new Error(
			"useDropdownMenuContext must be used within a DropdownMenuProvider",
		);
	}

	return ctx;
};

export const DropdownMenu: FCC<DropdownMenuProps> = ({
	children,
	isOpen,
	position = "bottom",
	...props
}) => {
	return (
		<DropdownMenuContext.Provider value={{ isOpen, position }}>
			<div className="relative" {...props}>
				{children}
			</div>
		</DropdownMenuContext.Provider>
	);
};

interface DropdownMenuContentProps extends HTMLAttributes<HTMLElement> {}

export const DropdownMenuContent: FCC<DropdownMenuContentProps> = ({
	children,
	className,
	...props
}) => {
	const { isOpen, position } = useDropdownMenuContext();

	if (isOpen) {
		return (
			<nav
				className={cn(
					"shadow bg-white border border-zinc-200 rounded-md overflow-hidden absolute z-10",
					positionClasses[position],
					className,
				)}
				{...props}
			>
				<ul>{children}</ul>
			</nav>
		);
	}

	return null;
};

interface DropdownMenuTriggerProps {
	asChild?: boolean;
}
export const DropdownMenuTrigger: FCC<DropdownMenuTriggerProps> = ({
	asChild,
	...props
}) => {
	const Element = asChild ? Slot : "button";

	return <Element {...props} />;
};

interface DropdownMenuItemProps extends HTMLAttributes<HTMLButtonElement> {}

export const DropdownMenuItem: FCC<DropdownMenuItemProps> = ({
	children,
	onClick = () => {},
	className,
}) => {
	return (
		<li>
			<button
				type="button"
				onClick={(evt) => {
					onClick(evt);
				}}
				className={cn(
					"w-full text-left px-4 py-2 hover:bg-zinc-100 focus:bg-zinc-100 cursor-pointer",
					className,
				)}
			>
				{children}
			</button>
		</li>
	);
};
