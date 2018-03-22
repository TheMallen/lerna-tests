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
var Provider_1 = require("../Provider");
var Shortcut = /** @class */ (function (_super) {
    __extends(Shortcut, _super);
    function Shortcut() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {
            node: _this.props.node,
            keys: _this.props.keys,
            ignoreInput: _this.props.ignoreInput || false,
            onMatch: _this.props.onMatch,
            allowDefault: _this.props.allowDefault,
        };
        return _this;
    }
    Shortcut.prototype.componentDidMount = function () {
        var node = this.data.node;
        if (node != null) {
            return false;
        }
        var shortcutManager = this.context.shortcutManager;
        this.subscription = shortcutManager.subscribe(this.data);
    };
    Shortcut.prototype.componentWillUnmount = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    Shortcut.prototype.render = function () {
        return null;
    };
    Shortcut.contextTypes = Provider_1.contextTypes;
    return Shortcut;
}(React.Component));
exports.default = Shortcut;
//# sourceMappingURL=Shortcut.js.map