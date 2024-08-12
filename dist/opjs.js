"use strict";
/*!
 *
 * OverpoweredJS v0.0.1
 *
 * https://github.com/Joe12387/overpoweredjs
 *
 *
 **/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
exports.opjs = void 0;
var components_1 = require("./components");
var hash_1 = require("./utils/hash");
var utils_1 = require("./utils/utils");
var isOpaque = false; // vestigial from CS Edition, may be used in future versions of OS Edition
function processModule(module, name) {
    var processedModule = {};
    processedModule[name] = {};
    var status = module['status'];
    var status_identifier = 'status';
    if (isOpaque) {
        processedModule[name][status_identifier] = status;
    }
    else {
        if (typeof processedModule[name][status_identifier] !== 'undefined') {
            throw new Error('Status already exists on the object');
        }
        processedModule[name][status_identifier] = status;
    }
    if (status >= 0) {
        var value = module['value'];
        var type = module['type'];
        if (type === 'object') {
            for (var key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    var identifier = key;
                    if (isOpaque) {
                        var keyHash = (0, hash_1.hash)(identifier).toString(36);
                        processedModule[keyHash] = (0, hash_1.hash)((0, hash_1.hash)((0, utils_1.stringify)(value[key])).toString(36), (0, hash_1.hash)((0, hash_1.hash)(type).toString(36), (0, hash_1.hash)(keyHash, status))).toString(36);
                    }
                    else {
                        processedModule[identifier] = value[key];
                    }
                }
            }
        }
        else {
            var value_identifier = name + '_value';
            var type_identifier = name + '_type';
            if (isOpaque) {
                var value_keyHash = (0, hash_1.hash)(value_identifier).toString(36);
                processedModule[name][value_keyHash] = (0, hash_1.hash)((0, hash_1.hash)((0, utils_1.stringify)(value)).toString(36), (0, hash_1.hash)((0, hash_1.hash)(type).toString(36), (0, hash_1.hash)(value_keyHash, status))).toString(36);
                var type_keyHash = (0, hash_1.hash)(type_identifier).toString(36);
                processedModule[name][type_keyHash] = (0, hash_1.hash)((0, hash_1.hash)((0, utils_1.stringify)(value)).toString(36), (0, hash_1.hash)((0, hash_1.hash)(type).toString(36), (0, hash_1.hash)(type_keyHash, status))).toString(36);
            }
            else {
                processedModule[value_identifier] = value;
                processedModule[type_identifier] = type;
            }
        }
    }
    return processedModule;
}
function processFingerprint(fingerprint) {
    var brave = processModule(fingerprint['brave'], 'brave');
    var screen = processModule(fingerprint['screen'], 'screen');
    var userAgentData = processModule(fingerprint['userAgentData'], 'userAgentData');
    var jsHeapSizeLimit = processModule(fingerprint['jsHeapSizeLimit'], 'jsHeapSizeLimit');
    var devicePixelRatio = processModule(fingerprint['devicePixelRatio'], 'devicePixelRatio');
    var timingResolution = processModule(fingerprint['timingResolution'], 'timingResolution');
    var getBattery = processModule(fingerprint['getBattery'], 'getBattery');
    var matchMedia = processModule(fingerprint['matchMedia'], 'matchMedia');
    var processedFingerprint = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, brave), screen), userAgentData), jsHeapSizeLimit), devicePixelRatio), timingResolution), getBattery), matchMedia);
    return processedFingerprint;
}
function withTimeout(promise, ms, error, context) {
    var timeout = new Promise(function (_, reject) {
        return setTimeout(function () { return reject(new Error("OverpoweredJS: ".concat(error, " - Context: ").concat(context))); }, ms);
    });
    return Promise.race([promise, timeout]);
}
function handleError(error, stage, componentName) {
    console.error("OverpoweredJS: Error in ".concat(componentName, " (").concat(stage, "): ").concat(error.message));
}
function opjs() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var fingerprint = {};
                    if (typeof self.window !== 'object' || self.window === null || typeof self.window.document !== 'object' || self.window.document === null) {
                        reject(new Error('OverpoweredJS: window and/or document object not found. Only run in a browser environment. Other contexts are not supported.'));
                    }
                    var timeoutMs = 2000; // 2 seconds
                    var fingerprintStage1Promises = components_1.fingerprintStage1.map(function (component) { return ({
                        promise: withTimeout(component.func(fingerprint)["catch"](function (error) {
                            handleError(error, 'stage 1', component.name);
                            throw error;
                        }), timeoutMs, "OverpoweredJS: ".concat(component.name, " (stage 1) timed out"), "Stage 1 - ".concat(component.name)),
                        name: component.name
                    }); });
                    return Promise.all(fingerprintStage1Promises.map(function (p) { return p.promise; }))
                        .then(function (results) {
                        results.forEach(function (result, index) {
                            var name = fingerprintStage1Promises[index].name;
                            fingerprint[name] = result;
                        });
                        var fingerprintStage2Promises = components_1.fingerprintStage2.map(function (component) { return ({
                            promise: withTimeout(component.func(fingerprint)["catch"](function (error) {
                                handleError(error, 'stage 2', component.name);
                                throw error;
                            }), timeoutMs, "OverpoweredJS: ".concat(component.name, " (stage 2) timed out"), "Stage 2 - ".concat(component.name)),
                            name: component.name
                        }); });
                        return Promise.all(fingerprintStage2Promises.map(function (p) { return p.promise; }))
                            .then(function (results) {
                            results.forEach(function (result, index) {
                                var name = fingerprintStage2Promises[index].name;
                                fingerprint[name] = result;
                            });
                            var fingerprintStage3Promises = components_1.fingerprintStage3.map(function (component) { return ({
                                promise: withTimeout(component.func(fingerprint)["catch"](function (error) {
                                    handleError(error, 'stage 3', component.name);
                                    throw error;
                                }), timeoutMs, "OverpoweredJS: ".concat(component.name, " (stage 3) timed out"), "Stage 3 - ".concat(component.name)),
                                name: component.name
                            }); });
                            return Promise.all(fingerprintStage3Promises.map(function (p) { return p.promise; }))
                                .then(function (results) {
                                results.forEach(function (result, index) {
                                    var name = fingerprintStage3Promises[index].name;
                                    fingerprint[name] = result;
                                });
                                var getFingerprint = function () { return processFingerprint(fingerprint); };
                                resolve({ getFingerprint: getFingerprint });
                            })["catch"](function (error) {
                                handleError(error, 'stage 3', 'unknown');
                                reject(new Error("OverpoweredJS: Error in stage 3: ".concat(error.message)));
                            });
                        })["catch"](function (error) {
                            handleError(error, 'stage 2', 'unknown');
                            reject(new Error("OverpoweredJS: Error in stage 2: ".concat(error.message)));
                        });
                    })["catch"](function (error) {
                        handleError(error, 'stage 1', 'unknown');
                        reject(new Error("OverpoweredJS: Error in stage 1: ".concat(error.message)));
                    });
                })];
        });
    });
}
exports.opjs = opjs;
if (typeof window !== 'undefined') {
    self.window.opjs = opjs;
}
// for debugging purposes only
self.window
    .opjs()
    .then(function (fp) { return console.log(fp.getFingerprint()); })["catch"](console.error);
exports["default"] = opjs;
