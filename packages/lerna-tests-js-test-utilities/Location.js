"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location = /** @class */ (function () {
    function Location() {
        this.isUsingFakeLocation = false;
    }
    Location.prototype.fake = function () {
        if (this.isUsingFakeLocation) {
            throw new Error('You tried to fake window.location when it was already faked.');
        }
        // required to make it possible to write to locaiton.search in tests
        // https://github.com/facebook/jest/issues/890
        Object.defineProperty(window.location, 'search', {
            writable: true,
            value: '',
        });
        this.originalAssign = window.location.assign;
        this.mock = jest.fn();
        window.location.assign = this.mock;
        this.isUsingFakeLocation = true;
    };
    Location.prototype.restore = function () {
        if (!this.isUsingFakeLocation) {
            throw new Error('You tried to restore window.location when it was already restored.');
        }
        location.search = '';
        this.mock = null;
        window.location.assign = this.originalAssign;
        this.isUsingFakeLocation = false;
    };
    return Location;
}());
exports.default = Location;
