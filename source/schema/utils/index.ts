import validate from "./validate";

export const createSchemaProxy = <Target extends Record<any, any>>(schema) => {
	const target = (schema) => {
		return createSchemaProxy(schema);
	};

	for (const key in schema) {
		Reflect.set(target, key, schema[key]);
	}

	return new Proxy<Target>(target as any, {
		apply(target: any, thisArgs: any, args: any[]) {
			return Reflect.apply(target, thisArgs, args);
		},
		get(target: any, property: string, receiver: any): any {
			if (property === "validate") {
				return (data: any) => validate(target, data);
			}

			return Reflect.get(target, property, receiver);
		}
	});
};
