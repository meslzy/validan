import {createSchemaProxy} from "./utils";
import {Validate} from "./utils/validate";

import Schema from "./types";
import {DeepPartial} from "./types/utils";

type Target = {
	<T>(schema: Schema<T>): Schema<T> & Getter<Schema<T>> & Setter<Schema<T>>;
};

type Setter<T> = {
	beforeValidation: (schema: T, data: T extends Schema<infer U> ? DeepPartial<U> : any) => any;
	afterValidation: (data: T extends Schema<infer U> ? DeepPartial<U> : any) => any;
};

type Getter<T> = {
	validate: (data: T extends Schema<infer U> ? DeepPartial<U> : any) => T extends Schema<infer U> ? Validate<T, U> : Validate<T, any>;
};

const schemaTarget = (schema) => {
	return createSchemaProxy(schema);
};

export type schema = Target & Setter<any>;

const schema = createSchemaProxy<schema>(schemaTarget);

export default schema;
