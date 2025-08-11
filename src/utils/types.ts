import type {
	UseMutationOptions,
	UseQueryOptions,
} from "@tanstack/react-query";
import type { FC, ReactNode } from "react";

// biome-ignore lint/complexity/noBannedTypes: Uses same default generic as React.FC
export type FCC<T = {}> = FC<
	T &
		Readonly<{
			children?: ReactNode;
		}>
>;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type MutationProps<
	// biome-ignore lint/suspicious/noExplicitAny: Any is necessary to make the function generic
	TFunc extends (arg: any) => Promise<any>,
	TError = {
		error: string;
		message: string;
		status: number;
	},
> = Omit<
	UseMutationOptions<
		Awaited<ReturnType<TFunc>>,
		TError,
		Parameters<TFunc>[0],
		unknown
	>,
	"mutationFn"
>;

export type QueryProps<
	// biome-ignore lint/suspicious/noExplicitAny: Any is necessary to make the function generic
	TFunc extends (arg: any) => Promise<any>,
	TError = {
		error: string;
		message: string;
		status: number;
	},
> = PartialBy<
	Omit<UseQueryOptions<Awaited<ReturnType<TFunc>>, TError>, "queryFn">,
	"queryKey"
> &
	(Parameters<TFunc>[0] extends never
		? // biome-ignore lint/complexity/noBannedTypes: Generic function without parameters
			{}
		: Partial<Parameters<TFunc>[0]>);

export type AwaitedReturn<T> = T extends Promise<infer U> ? U : T;
