"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prop_types_1 = require("prop-types");
var ShortcutManager_1 = require("../ShortcutManager");
exports.contextTypes = {
    shortcutManager: prop_types_1.default.instanceOf(ShortcutManager_1.default),
};
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shortcutManager = new ShortcutManager_1.default();
        return _this;
    }
    Provider.prototype.componentDidMount = function () {
        this.shortcutManager.setup();
    };
    Provider.prototype.getChildContext = function () {
        return {
            shortcutManager: this.shortcutManager,
        };
    };
    Provider.prototype.render = function () {
        return this.props.children;
    };
    Provider.childContextTypes = exports.contextTypes;
    return Provider;
}(React.Component));
exports.default = Provider;
