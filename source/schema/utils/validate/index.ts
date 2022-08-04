import Schema from "../../types";

export type Validate<T, U> = {
  valid: boolean;
};

const validate = <T extends Schema<any>, U>(schema: T, data: U, errorsOnly = false): any => {
  const errors = [];

  if (schema.type === "object") {
    for (const property in schema.properties) {
      if (schema.properties[property] instanceof Function) {
        const nestedSchema = schema.properties[property] as any
        errors.concat(nestedSchema.validate(nestedSchema, data[property], true));
      } else {
        errors.concat(validate(schema.properties[property], data[property], true));
      }
    }
  }

  if (schema.type === "array") {
    console.log("array");
  }

  if (schema.type === "string") {
    console.log("string");
  }

  if (schema.type === "number") {
    console.log("number");
  }

  if (schema.type === "boolean") {
    console.log("boolean");
  }

  if (errorsOnly) return errors;

  return {
    valid: errors.length === 0,
  };
};

export default validate;
