"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("@shopify/lerna-tests-javascript-utilities/decorators");
var AnimationFrame = /** @class */ (function () {
    function AnimationFrame() {
        this.isUsingFakeAnimationFrame = false;
        this.queued = {};
        this.currentAnimationFrame = 0;
    }
    AnimationFrame.prototype.fake = function () {
        if (this.isUsingFakeAnimationFrame) {
            throw new Error('The animation frame is already faked, but you tried to fake it again.');
        }
        this.isUsingFakeAnimationFrame = true;
        this.originalRequestAnimationFrame = window.requestAnimationFrame;
        window.requestAnimationFrame = this.requestAnimationFrame;
        this.originalCancelAnimationFrame = window.cancelAnimationFrame;
        window.cancelAnimationFrame = this.cancelAnimationFrame;
    };
    AnimationFrame.prototype.restore = function () {
        if (!this.isUsingFakeAnimationFrame) {
            throw new Error('The animation frame is already real, but you tried to restore it again.');
        }
        this.isUsingFakeAnimationFrame = false;
        window.requestAnimationFrame = this.originalRequestAnimationFrame;
        window.cancelAnimationFrame = this.originalCancelAnimationFrame;
    };
    AnimationFrame.prototype.runFrame = function () {
        var _this = this;
        this.ensureAnimationFrameIsFake();
        // We need to do it this way so that frames that queue other frames
        // don't get removed
        Object.keys(this.queued).forEach(function (frame) {
            var callback = _this.queued[frame];
            delete _this.queued[frame];
            callback(Date.now());
        });
    };
    AnimationFrame.prototype.requestAnimationFrame = function (callback) {
        this.currentAnimationFrame += 1;
        this.queued[this.currentAnimationFrame] = callback;
        return this.currentAnimationFrame;
    };
    AnimationFrame.prototype.cancelAnimationFrame = function (frame) {
        delete this.queued[frame];
    };
    AnimationFrame.prototype.ensureAnimationFrameIsFake = function () {
        if (!this.isUsingFakeAnimationFrame) {
            throw new Error('You must call animationFrame.fake() before interacting with the fake request-/ cancelAnimationFrame.');
        }
    };
    __decorate([
        decorators_1.autobind
    ], AnimationFrame.prototype, "requestAnimationFrame", null);
    __decorate([
        decorators_1.autobind
    ], AnimationFrame.prototype, "cancelAnimationFrame", null);
    return AnimationFrame;
}());
exports.default = AnimationFrame;
//# sourceMappingURL=animation-frame.js.map