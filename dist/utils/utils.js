"use strict";
exports.__esModule = true;
exports.stringify = exports.getSpecificTypeAndValue = exports.getSpecificType = void 0;
var getSpecificType = function (variable) {
    var typeofVariable = typeof variable;
    if (typeofVariable === 'object') {
        if (variable === null) {
            return 'null';
        }
        if (Array.isArray(variable)) {
            return 'array';
        }
    }
    if (typeofVariable === 'number') {
        if (variable === Infinity) {
            return 'infinity';
        }
        if (variable === -Infinity) {
            return '-infinity';
        }
        if (isNaN(variable)) {
            return 'nan';
        }
    }
    return typeofVariable;
};
exports.getSpecificType = getSpecificType;
var getSpecificTypeAndValue = function (variable) {
    return {
        type: (0, exports.getSpecificType)(variable),
        value: variable
    };
};
exports.getSpecificTypeAndValue = getSpecificTypeAndValue;
var stringify = function (value) {
    if (typeof JSON === 'object' && typeof JSON.stringify === 'function') {
        return JSON.stringify(value);
    }
    function escapeString(str) {
        return '"' + str.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    }
    if (value === null) {
        return 'null';
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }
    if (typeof value === 'string') {
        return escapeString(value);
    }
    if (typeof value === 'undefined') {
        return 'null';
    }
    if (Array.isArray(value)) {
        var arrayValues = value.map(function (item) { return (typeof item === 'undefined' ? 'null' : (0, exports.stringify)(item)); }).join(',');
        return '[' + arrayValues + ']';
    }
    if (typeof value === 'object') {
        var objectKeys = Object.keys(value);
        var objectValues = objectKeys
            .filter(function (key) { return typeof value[key] !== 'undefined'; })
            .map(function (key) { return escapeString(key) + ':' + (0, exports.stringify)(value[key]); })
            .join(',');
        return '{' + objectValues + '}';
    }
    return 'null'; // fallback for unsupported types
};
exports.stringify = stringify;
