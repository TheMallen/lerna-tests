"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
var clock_1 = require("./clock");
var timer_1 = require("./timer");
var animation_frame_1 = require("./animation-frame");
var storage_1 = require("./storage");
var Location_1 = require("./Location");
var match_media_1 = require("./match-media");
__export(require("./other"));
exports.clock = new clock_1.default();
exports.timer = new timer_1.default();
exports.animationFrame = new animation_frame_1.default();
exports.localStorage = new storage_1.default();
exports.sessionStorage = new storage_1.default();
exports.location = new Location_1.default();
exports.matchMedia = new match_media_1.default();
var match_media_2 = require("./match-media");
exports.mediaQueryList = match_media_2.mediaQueryList;
var async_helpers_1 = require("./async-helpers");
exports.noopPromise = async_helpers_1.noopPromise;
exports.nextEventLoopTick = async_helpers_1.nextEventLoopTick;
var fetch_1 = require("./fetch");
exports.fetch = fetch_1.default;
