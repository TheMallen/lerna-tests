"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timer = /** @class */ (function () {
    function Timer() {
        this.isUsingFakeTimer = false;
    }
    Timer.prototype.fake = function () {
        if (this.isUsingFakeTimer) {
            throw new Error('The Timer is already faked, but you tried to fake it again.');
        }
        jest.useFakeTimers();
        this.isUsingFakeTimer = true;
    };
    Timer.prototype.restore = function () {
        if (!this.isUsingFakeTimer) {
            throw new Error('The Timer is already real, but you tried to restore it again.');
        }
        jest.useRealTimers();
        this.isUsingFakeTimer = false;
    };
    Timer.prototype.runAllTimers = function () {
        this.ensureTimerIsFake();
        jest.runAllTimers();
    };
    Timer.prototype.runTimersToTime = function (time) {
        this.ensureTimerIsFake();
        jest.runTimersToTime(time);
    };
    Timer.prototype.ensureTimerIsFake = function () {
        if (!this.isUsingFakeTimer) {
            throw new Error('You must call Timer.fakeTimer() before interacting with the fake Timer.');
        }
    };
    return Timer;
}());
exports.default = Timer;
