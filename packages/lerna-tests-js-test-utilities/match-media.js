"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var other_1 = require("@shopify/lerna-tests-javascript-utilities/other");
var MatchMedia = /** @class */ (function () {
    function MatchMedia() {
        this.isUsingFakeMatchMedia = false;
    }
    MatchMedia.prototype.fake = function (media) {
        if (media === void 0) { media = defaultMatcher; }
        this.originalMatchMedia = window.matchMedia;
        window.matchMedia = function (query) { return mediaQueryList(media(query)); };
        this.isUsingFakeMatchMedia = true;
    };
    MatchMedia.prototype.restore = function () {
        window.matchMedia = this.originalMatchMedia;
        this.isUsingFakeMatchMedia = false;
    };
    return MatchMedia;
}());
exports.default = MatchMedia;
function defaultMatcher() {
    return { media: '', addListener: other_1.noop, removeListener: other_1.noop, matches: false };
}
function mediaQueryList(values) {
    return __assign({}, defaultMatcher(), values);
}
exports.mediaQueryList = mediaQueryList;
