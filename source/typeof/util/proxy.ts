import TypeOf from "./typeof";

type Merge<A, B> = {
	[KEY in (keyof A | keyof B)]: (KEY extends keyof A ? A[KEY] : never) | (KEY extends keyof B ? B[KEY] : never);
};

interface TypeOfFunction<Types> {
	(value?: any): TypeOf<Types>;

	with<CustomTypes>(customTypes: CustomTypes): TypeOfProxy<Merge<CustomTypes, Types>>;

	create<CustomTypes>(customTypes: CustomTypes): TypeOfProxy<CustomTypes>;
}

type TypeOfGetter = {
	readonly types: string[];
}

type TypeOfSetter<Types extends Record<string, any>> = {
	[Type in keyof Types]: Types[Type];
}

export type TypeOfProxy<Types> = TypeOfFunction<Types> & TypeOfGetter & TypeOfSetter<Types>;

export const createTypeOfProxy = <Types extends Record<string, any>>(types) => {
	return new Proxy<Types>(types, {
		apply(target: any, thisArg: any, argArray: any[]) {
			return Reflect.apply(target, thisArg, argArray.length ? argArray.concat([types]) : [undefined, types]);
		},
		get(types: any, property: string, receiver: any) {
			if (property === "types") {
				return Object.keys(types);
			}

			if (property === "with") {
				const createTypes = (value: any, types) => {
					return new TypeOf(value, types);
				};

				for (const type in types) {
					Reflect.set(createTypes, type, types[type]);
				}

				return (customTypes) => {
					for (const customType in customTypes) {
						Reflect.set(createTypes, customType, customTypes[customType]);
					}

					return createTypeOfProxy(createTypes);
				};
			}

			if (property === "create") {
				const createTypes = (value: any, types) => {
					return new TypeOf(value, types);
				};

				return (customTypes) => {
					for (const customType in customTypes) {
						Reflect.set(createTypes, customType, customTypes[customType]);
					}

					return createTypeOfProxy(createTypes);
				};
			}

			return Reflect.get(types, property, receiver);
		},
		set(types, property: string, value: any, receiver: any) {
			return Reflect.set(types, property, value, receiver);
		},
	});
};
