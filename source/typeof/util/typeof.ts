type OmitFirstArgument<Type> = Type extends (first: any, ...args: infer Rest) => any ? Rest : never;

class TypeOf<Types extends Record<string, any>> {
	value: any;
	types: any;

	constructor(value, types) {
		this.value = value;
		this.types = types;
	}

	is<Type extends keyof Types>(type: Type | string, ...args: OmitFirstArgument<Types[Type]>): ReturnType<Types[Type]> {
		if (Reflect.has(this.types, type)) {
			return this.types[type](this.value, ...args);
		}

		throw new Error(`TypeOf: type "${String(type)}" is not defined`);
	}

	not<Type extends keyof Types>(type: Type | string, ...args: OmitFirstArgument<Types[Type]>): boolean {
		return !this.is(type, ...args);
	}
}

export default TypeOf;
