"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchemaProxy = void 0;
var validate_1 = require("./validate");
var createSchemaProxy = function (schema) {
    var target = function (schema) {
        return (0, exports.createSchemaProxy)(schema);
    };
    for (var key in schema) {
        Reflect.set(target, key, schema[key]);
    }
    return new Proxy(target, {
        apply: function (target, thisArgs, args) {
            return Reflect.apply(target, thisArgs, args);
        },
        get: function (target, property, receiver) {
            if (property === "validate") {
                return function (data) { return (0, validate_1.default)(target, data); };
            }
            return Reflect.get(target, property, receiver);
        }
    });
};
exports.createSchemaProxy = createSchemaProxy;
//# sourceMappingURL=index.js.map