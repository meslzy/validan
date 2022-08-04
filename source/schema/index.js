"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var schemaTarget = function (schema) {
    return (0, utils_1.createSchemaProxy)(schema);
};
var schema = (0, utils_1.createSchemaProxy)(schemaTarget);
exports.default = schema;
//# sourceMappingURL=index.js.map