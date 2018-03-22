"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage = /** @class */ (function () {
    function Storage() {
        this.getItem = jest.fn(this.unmockedGetItem);
        this.setItem = jest.fn(this.unmockedSetItem);
        this.removeItem = jest.fn(this.unmockedRemoveItem);
        this.clear = jest.fn(this.unmockedClearItem);
        this.store = Object.create(null);
    }
    Storage.prototype.restore = function () {
        this.getItem.mockClear();
        this.getItem.mockImplementation(this.unmockedGetItem);
        this.setItem.mockClear();
        this.setItem.mockImplementation(this.unmockedSetItem);
        this.removeItem.mockClear();
        this.removeItem.mockImplementation(this.unmockedRemoveItem);
        this.clear.mockClear();
        this.clear.mockImplementation(this.unmockedClearItem);
        this.clear();
    };
    Storage.prototype.unmockedGetItem = function (key) {
        return this.store[key] || null;
    };
    Storage.prototype.unmockedSetItem = function (key, value) {
        this.store[key] = value.toString();
    };
    Storage.prototype.unmockedRemoveItem = function (key) {
        delete this.store[key];
    };
    Storage.prototype.unmockedClearItem = function () {
        this.store = {};
    };
    return Storage;
}());
exports.default = Storage;
//# sourceMappingURL=storage.js.map