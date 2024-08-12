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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.matchMedia = void 0;
var interfaces_1 = require("../../utils/interfaces");
var matchMedia = function (fingerprint) { return __awaiter(void 0, void 0, void 0, function () {
    var mediaQueries, matchMedia, matchMedia_mediaQueries, _a, _b, _c, key, value, value_1, value_1_1, item, query, result;
    var e_1, _d, e_2, _e;
    return __generator(this, function (_f) {
        mediaQueries = {
            'prefers-contrast': ['high', 'more', 'low', 'less', 'forced', 'no-preference', 'high-contrast', 'low-contrast'],
            'color-gamut': ['rec2020', 'p3', 'srgb', 'display-p3', 'a98rgb'],
            'dynamic-range': ['high', 'standard', 'hdr', 'sdr'],
            'video-dynamic-range': ['high', 'standard', 'hdr', 'sdr'],
            'any-hover': ['hover', 'none', 'on-demand'],
            'any-pointer': ['none', 'coarse', 'fine', 'hover'],
            'pointer': ['none', 'coarse', 'fine', 'hover'],
            'hover': ['hover', 'none', 'on-demand'],
            'update': ['fast', 'slow', 'none'],
            'overflow-block': ['scroll', 'none', 'optional-paged', 'paged', 'optional-paged-x', 'optional-paged-y'],
            'overflow-inline': ['scroll', 'none', 'optional-paged', 'paged', 'optional-paged-x', 'optional-paged-y'],
            'color': ['8', '16', '256', '4k', '8k'],
            'inverted-colors': ['inverted', 'none', 'no-preference'],
            'prefers-reduced-motion': ['reduce', 'no-preference', 'motion'],
            'prefers-reduced-transparency': ['reduce', 'no-preference', 'transparency'],
            'grid': ['0', '1', '2'],
            'scripting': ['none', 'initial-only', 'enabled', 'enabled-only'],
            'forced-colors': ['active', 'none', 'none', 'active'],
            'display-mode': ['fullscreen', 'standalone', 'minimal-ui', 'browser', 'window'],
            'aspect-ratio': ['1/1', '16/9', '16/10', '4/3', '8/5', '5/4', '5/3', '3/2', '16/12', '3/4', '9/16', '10/16', '3/5', '2/3', '12/16'],
            'resolution': ['300dpi', '2dppx', '3dppx'],
            'prefers-color-scheme': ['dark', 'light', 'no-preference'],
            'overflow': ['auto', 'hidden'],
            'transform-3d': ['0', '1'],
            'device-aspect-ratio': ['1/1', '16/9', '16/10', '4/3', '8/5', '5/4', '5/3', '3/2', '16/12', '3/4', '9/16', '10/16', '3/5', '2/3', '12/16'],
            'device-height': ['640px', '768px', '1024px'],
            'device-width': ['320px', '360px', '375px'],
            'forced-color-adjust': ['none', 'auto'],
            'orientation': ['portrait', 'landscape'],
            'scan': ['progressive', 'interlace']
        };
        matchMedia = self.matchMedia;
        if (typeof matchMedia !== 'function') {
            return [2 /*return*/, (0, interfaces_1.resolveComponent)(-1)];
        }
        matchMedia_mediaQueries = {};
        try {
            for (_a = __values(Object.entries(mediaQueries)), _b = _a.next(); !_b.done; _b = _a.next()) {
                _c = __read(_b.value, 2), key = _c[0], value = _c[1];
                try {
                    for (value_1 = (e_2 = void 0, __values(value)), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                        item = value_1_1.value;
                        query = "(".concat(key, ": ").concat(item, ")");
                        try {
                            result = window.matchMedia(query);
                            matchMedia_mediaQueries[query] = result.matches;
                        }
                        catch (e) {
                            matchMedia_mediaQueries[query] = { error: true };
                            ;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (value_1_1 && !value_1_1.done && (_e = value_1["return"])) _e.call(value_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return [2 /*return*/, (0, interfaces_1.resolveComponent)(0, { matchMedia_mediaQueries: matchMedia_mediaQueries })];
    });
}); };
exports.matchMedia = matchMedia;
