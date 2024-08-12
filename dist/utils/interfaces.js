"use strict";
exports.__esModule = true;
exports.resolveComponent = void 0;
var utils_1 = require("./utils");
var resolveComponent = function (status, value) {
    if (typeof value === 'object' && value !== null) {
        if ('status' in value) {
            throw new Error('Status already exists on the object');
        }
        for (var key in value) {
            if (typeof value[key] === 'object' && value[key] !== null) {
                value[key].status = status;
            }
        }
    }
    return {
        status: status,
        value: value,
        type: (0, utils_1.getSpecificType)(value)
    };
};
exports.resolveComponent = resolveComponent;
