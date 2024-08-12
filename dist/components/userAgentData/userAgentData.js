"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.userAgentData = void 0;
var interfaces_1 = require("../../utils/interfaces");
var utils_1 = require("../../utils/utils");
var parseBrand = function (arr) {
    var brands = [];
    if (!arr)
        return [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item.brand) {
            var brand = item.brand;
            if (!new RegExp('Brand', 'i').test(brand)) {
                brands.push(brand);
            }
        }
    }
    return brands.sort();
};
var userAgentData = function (fingerprint) { return __awaiter(void 0, void 0, void 0, function () {
    var userAgentData, highEntropyKeys, promises, _loop_1, highEntropyKeys_1, highEntropyKeys_1_1, key;
    var e_1, _a;
    return __generator(this, function (_b) {
        userAgentData = navigator.userAgentData;
        if (!userAgentData)
            return [2 /*return*/, (0, interfaces_1.resolveComponent)(-1)];
        if (typeof userAgentData.getHighEntropyValues !== 'function')
            return [2 /*return*/, (0, interfaces_1.resolveComponent)(-2)];
        highEntropyKeys = [
            'architecture',
            'bitness',
            'brands',
            'formFactor',
            'fullVersionList',
            'mobile',
            'model',
            'platform',
            'platformVersion',
            'uaFullVersion',
            'wow64',
        ];
        promises = [];
        _loop_1 = function (key) {
            try {
                promises.push(userAgentData.getHighEntropyValues([key]).then(function (value) {
                    var _a;
                    return _a = {}, _a[key] = value, _a;
                }));
            }
            catch (e) {
                promises.push(Promise.resolve({ error: true }));
            }
        };
        try {
            for (highEntropyKeys_1 = __values(highEntropyKeys), highEntropyKeys_1_1 = highEntropyKeys_1.next(); !highEntropyKeys_1_1.done; highEntropyKeys_1_1 = highEntropyKeys_1.next()) {
                key = highEntropyKeys_1_1.value;
                _loop_1(key);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (highEntropyKeys_1_1 && !highEntropyKeys_1_1.done && (_a = highEntropyKeys_1["return"])) _a.call(highEntropyKeys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return [2 /*return*/, Promise.all(promises).then(function (values) {
                var e_2, _a;
                var output = {};
                var _loop_2 = function (value) {
                    var key = Object.keys(value)[0];
                    var highEntropyValues = value[key];
                    highEntropyValues.brands =
                        (0, utils_1.getSpecificType)(highEntropyValues.brands) === 'array'
                            ? parseBrand(highEntropyValues.brands)
                            : highEntropyValues.brands;
                    (function () {
                        var e_3, _a;
                        if (Array.isArray(highEntropyValues.fullVersionList)) {
                            var sortedList = {};
                            try {
                                for (var _b = (e_3 = void 0, __values(highEntropyValues.fullVersionList)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var item = _c.value;
                                    if (!new RegExp('Brand', 'i').test(item.brand)) {
                                        sortedList[item.brand] = item.version;
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            highEntropyValues.fullVersionList = sortedList;
                        }
                    })();
                    for (var k in highEntropyValues) {
                        if (Object.prototype.hasOwnProperty.call(highEntropyValues, k)) {
                            output['userAgentData_' + k] = (0, utils_1.getSpecificTypeAndValue)(highEntropyValues[k]);
                        }
                        else {
                            output['userAgentData_' + k] = { type: 'undefined' };
                        }
                    }
                };
                try {
                    for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                        var value = values_1_1.value;
                        _loop_2(value);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (values_1_1 && !values_1_1.done && (_a = values_1["return"])) _a.call(values_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return (0, interfaces_1.resolveComponent)(0, output);
            })];
    });
}); };
exports.userAgentData = userAgentData;
