type Operator =
	| "eq"
	| "neq"
	| "lt"
	| "gt"
	| "lte"
	| "gte"
	| "is"
	| "isn"
	| "in"
	| "nin"
	| "like"
	| "sw"
	| "ew";

export type Condition = ReturnType<typeof condition>;

export const condition = (
	field: string,
	operator: Operator,
	value: unknown,
) => {
	return {
		field,
		operator,
		value,
	};
};

export const conditionsToFilter = (condition?: Condition[]) => {
	console.log(condition);
	if (!condition || !condition.length) {
		return undefined;
	}

	const toFilter = (c: Condition) => {
		const value = (() => {
			switch (c.operator) {
				case "like":
				case "sw":
				case "ew":
					return `'${c.value}'`;
				default:
					return c.value;
			}
		})();

		return `${c.field} ${c.operator} ${value}`;
	};

	return condition.map(toFilter).join(" and ");
};
