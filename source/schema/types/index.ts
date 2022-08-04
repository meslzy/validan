type DefaultSchema<T> = StringSchema | NumberSchema | BooleanSchema | ArraySchema<T> | ObjectSchema<T>;

type Option<T> = T | {
  value: T;
  message: string;
};

type Regexp = {
  pattern: RegExp;
  message: string;
};

type IsRule = {
  email?: Option<boolean>;
  url?: Option<boolean>;
};

type StringSchema = {
  type: "string";
  id?: string;
  length?: {
    min?: Option<number>;
    max?: Option<number>;
  },
  regexp?: Regexp[];
  equals?: Option<string>[];
  notEquals?: Option<string>[];
  required?: Option<boolean>;
  notRequired?: Option<boolean>;
  contains?: Option<string>[];
  notContains?: Option<string>[];
  is?: IsRule;
  isNot?: IsRule;
  validate?: {
    [key: string]: Option<any>;
  },
};

type NumberSchema = {
  type: "number";
  id?: string;
}

type BooleanSchema = {
  type: "boolean";
  id?: string;
}

type ObjectSchema<T> = {
  type: "object";
  id?: string;
  properties: {
    [key in keyof T]: (
      T[key] extends string ? StringSchema :
        T[key] extends number ? NumberSchema :
          T[key] extends boolean ? BooleanSchema :
            T[key] extends Array<infer T> ? ArraySchema<T> :
              T[key] extends object ? ObjectSchema<T[key]> : DefaultSchema<T[key]>
      );
  },
}

type ArraySchema<T> = {
  type: "array";
}

type SchemaType<T> = {};

type Schema<T> = (
  T extends string ? StringSchema :
    T extends number ? NumberSchema :
      T extends boolean ? BooleanSchema :
        T extends Array<infer T> ? ArraySchema<T> :
          T extends object ? ObjectSchema<T> :
            DefaultSchema<T>
  ) & SchemaType<T>;

export default Schema;
