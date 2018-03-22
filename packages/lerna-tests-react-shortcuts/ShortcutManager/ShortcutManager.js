"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("@shopify/lerna-tests-javascript-utilities/events");
var autobind_1 = require("@shopify/lerna-tests-javascript-utilities/decorators/autobind");
var lodash_1 = require("lodash");
var ShortcutManager = /** @class */ (function () {
    function ShortcutManager() {
        this.keysPressed = [];
        this.shortcuts = [];
        this.shortcutsMatched = [];
    }
    ShortcutManager.prototype.setup = function () {
        events_1.addEventListener(document, 'keydown', this.handleKeyDown);
    };
    ShortcutManager.prototype.subscribe = function (data) {
        this.shortcuts.push(data);
        var self = this;
        return {
            unsubscribe: function () {
                var unsubscribeIndex = self.shortcuts.findIndex(function (shortcut) { return shortcut === data; });
                self.shortcuts.splice(unsubscribeIndex, 1);
            },
        };
    };
    ShortcutManager.prototype.resetKeys = function () {
        this.keysPressed = [];
        this.shortcutsMatched = [];
    };
    ShortcutManager.prototype.handleKeyDown = function (event) {
        var _this = this;
        var key = event.key;
        this.keysPressed.push(key);
        this.updateMatchingShortcuts();
        switch (this.shortcutsMatched.length) {
            case 0:
                this.resetKeys();
                break;
            case 1:
                this.callMatchedShortcut(event);
                break;
            default:
                this.timer = window.setTimeout(function () {
                    _this.callMatchedShortcut(event);
                }, 500);
        }
    };
    ShortcutManager.prototype.updateMatchingShortcuts = function () {
        var _this = this;
        var shortcuts = this.shortcutsMatched.length > 0 ? this.shortcutsMatched : this.shortcuts;
        this.shortcutsMatched = shortcuts.filter(function (_a) {
            var keys = _a.keys, node = _a.node, ignoreInput = _a.ignoreInput;
            if (isFocusedInput() && !ignoreInput) {
                return false;
            }
            var partiallyMatching = lodash_1.isEqual(_this.keysPressed, lodash_1.take(keys, _this.keysPressed.length));
            if (node) {
                var onFocusedNode = lodash_1.isEqual(document.activeElement, node);
                return partiallyMatching && onFocusedNode;
            }
            return partiallyMatching;
        });
    };
    ShortcutManager.prototype.callMatchedShortcut = function (event) {
        var _this = this;
        var longestMatchingShortcut = this.shortcutsMatched.find(function (_a) {
            var keys = _a.keys;
            return lodash_1.isEqual(keys, _this.keysPressed);
        });
        if (!longestMatchingShortcut) {
            return;
        }
        if (!longestMatchingShortcut.allowDefault) {
            event.preventDefault();
        }
        longestMatchingShortcut.onMatch();
        clearTimeout(this.timer);
        this.resetKeys();
        return true;
    };
    __decorate([
        autobind_1.default
    ], ShortcutManager.prototype, "handleKeyDown", null);
    return ShortcutManager;
}());
exports.default = ShortcutManager;
function isFocusedInput() {
    var target = document.activeElement;
    if (target.tagName == null) {
        return false;
    }
    return (target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.hasAttribute('contenteditable'));
}
//# sourceMappingURL=ShortcutManager.js.map