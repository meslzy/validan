"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate = function (schema, data, errorsOnly) {
    if (errorsOnly === void 0) { errorsOnly = false; }
    var errors = [];
    if (schema.type === "object") {
        for (var property in schema.properties) {
            if (schema.properties[property] instanceof Function) {
                var nestedSchema = schema.properties[property];
                errors.concat(nestedSchema.validate(nestedSchema, data[property], true));
            }
            else {
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
    if (errorsOnly)
        return errors;
    return {
        valid: errors.length === 0,
    };
};
exports.default = validate;
//# sourceMappingURL=index.js.map