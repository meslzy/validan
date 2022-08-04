import TypeOf from "./util/typeof";
import {createTypeOfProxy, TypeOfProxy} from "./util/proxy";

interface ValidanTypes {
	string: (value: unknown) => boolean;
	number: (value: unknown) => boolean;
	boolean: (value: unknown) => boolean;

	null: (value: unknown) => boolean;
	undefined: (value: unknown) => boolean;
	nullOrUndefined: (value: unknown) => boolean;

	object: (value: unknown) => boolean;
	array: (value: unknown) => boolean;
}

const validanTypes: ValidanTypes = {
	string: (value: unknown) => typeof value === "string",
	number: (value: unknown) => typeof value === "number",
	boolean: (value: unknown) => typeof value === "boolean",

	null: (value: unknown) => {
		return value === null;
	},
	undefined: (value: unknown) => {
		return typeof value === "undefined";
	},
	nullOrUndefined: (value: unknown) => {
		return validanTypes.null(value) || validanTypes.undefined(value);
	},

	object: (value: unknown) => {
		if (value === null || value === undefined) return false;

		if (value instanceof Object) {
			return value.constructor === Object;
		}

		return false;
	},
	array: (value: unknown) => {
		if (value === null || value === undefined) return false;

		if (value instanceof Object) {
			return value.constructor === Array;
		}

		return false;
	},
};

const types = (value: any, types) => {
	return new TypeOf(value, types);
};

for (const validanType in validanTypes) {
	Reflect.set(types, validanType, validanTypes[validanType]);
}

export type typeOf = TypeOfProxy<ValidanTypes>;

const typeOf = createTypeOfProxy<typeOf>(types);

export default typeOf;
