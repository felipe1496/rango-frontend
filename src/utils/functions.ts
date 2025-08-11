/** biome-ignore-all lint/suspicious/noExplicitAny: any is ok to generic functions */
import type { ClassValue } from "clsx";
import clsx from "clsx";
import { isArray, isDate, isObject, map, mapValues } from "lodash";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const env = () => ({
	VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
	VITE_API_URL: import.meta.env.VITE_API_URL,
});

export const isISODateString = (value: any): boolean => {
	return (
		typeof value === "string" &&
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
	);
};

export const reviveDates = (value: any): any => {
	if (isArray(value)) {
		return map(value, reviveDates);
	}

	if (isObject(value) && !isDate(value)) {
		return mapValues(value, (val) => reviveDates(val));
	}

	if (isISODateString(value)) {
		return new Date(value);
	}

	return value;
};
