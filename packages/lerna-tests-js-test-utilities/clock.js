"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lolex_1 = require("lolex");
var Clock = /** @class */ (function () {
    function Clock() {
        this.isUsingFakeClock = false;
    }
    Clock.prototype.fake = function () {
        this.fakeClock();
    };
    Clock.prototype.restore = function () {
        this.restoreClock();
    };
    // Clock
    Clock.prototype.fakeClock = function (now) {
        if (now === void 0) { now = Date.now(); }
        if (this.isUsingFakeClock) {
            throw new Error('The clock is already faked, but you tried to fake it again.');
        }
        this.isUsingFakeClock = true;
        this.fakedClock = lolex_1.default.install(now);
    };
    Clock.prototype.restoreClock = function () {
        if (!this.isUsingFakeClock) {
            throw new Error('The clock is already real, but you tried to restore it again.');
        }
        this.isUsingFakeClock = false;
        if (this.fakedClock) {
            this.fakedClock.uninstall();
            delete this.fakedClock;
        }
    };
    Clock.prototype.tick = function (time) {
        this.ensureClockIsFake();
        if (this.fakedClock) {
            this.fakedClock.tick(time);
        }
    };
    Clock.prototype.setTime = function (time) {
        this.ensureClockIsFake();
        if (this.fakedClock) {
            this.fakedClock.setSystemTime(time);
        }
    };
    Clock.prototype.ensureClockIsFake = function () {
        if (!this.isUsingFakeClock) {
            throw new Error('You must call clock.fakeClock() before interacting with the fake clock.');
        }
    };
    return Clock;
}());
exports.default = Clock;
