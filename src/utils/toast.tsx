import { Check, X } from "lucide-react";
import { toast as _toast } from "sonner";
import { cn } from "./functions";
export const toast = {
	success: (message: string, title?: string) => {
		return _toast.custom(() => (
			<div className="bg-gradient-to-b from-green-500 to-green-600 p-3 rounded-md shadow-lg text-white flex gap-2 text-shadow-sm">
				<Check className={cn(title && "translate-y-1")} />
				<div className="flex flex-col">
					{title && <span className="text-lg font-bold">{title}</span>}
					<span>{message}</span>
				</div>
			</div>
		));
	},
	error: (message: string, title?: string) => {
		return _toast.custom(() => (
			<div className="bg-gradient-to-b from-red-500 to-red-600 p-3 rounded-md shadow-lg text-white flex gap-2 text-shadow-sm">
				<X className={cn(title && "translate-y-1")} />
				<div className="flex flex-col">
					{title && <span className="text-lg font-bold">{title}</span>}
					<span>{message}</span>
				</div>
			</div>
		));
	},
};
