"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function findByTestID(root, id) {
    function hasTestID(wrapper) {
        return wrapper.length > 0 && wrapper.prop('testID') === id;
    }
    return root.findWhere(hasTestID).first();
}
exports.findByTestID = findByTestID;
function matchByTestID(root, regexp) {
    function matchesTestID(wrapper) {
        if (wrapper.length === 0) {
            return false;
        }
        var id = wrapper.prop('testID');
        return typeof id === 'string' && regexp.test(id);
    }
    return root.findWhere(matchesTestID);
}
exports.matchByTestID = matchByTestID;
function trigger(wrapper, keypath) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (wrapper.length === 0) {
        throw new Error([
            "You tried to trigger " + keypath + " on a React wrapper with no matching nodes.",
            'This generally happens because you have either filtered your React components incorrectly,',
            'or the component you are looking for is not rendered because of the props on your component,',
            'or there is some error during one of your component’s render methods.',
        ].join(' '));
    }
    var props = wrapper.props();
    var callback = lodash_1.get(props, keypath);
    if (callback == null) {
        throw new Error("No callback found at keypath '" + keypath + "'. Available props: " + Object.keys(props).join(', '));
    }
    var returnValue = callback.apply(void 0, args);
    updateRoot(wrapper);
    if (returnValue instanceof Promise) {
        return returnValue.then(function (ret) {
            updateRoot(wrapper);
            return ret;
        });
    }
    return returnValue;
}
exports.trigger = trigger;
/**
 * This is needed for updating the enzyme wrapper and react instance when we deeply change the context.
 * root.update() should work, but it doesn't currently (see https://github.com/airbnb/enzyme/issues/1329).
 */
function forceUpdate(root) {
    getInstance(root).forceUpdate();
    root.update();
}
exports.forceUpdate = forceUpdate;
function getInstance(wrapper) {
    var enzymeInstance = wrapper.instance();
    var adaptorInstance = enzymeInstance && enzymeInstance._reactInternalFiber;
    return adaptorInstance && adaptorInstance.stateNode;
}
function updateRoot(wrapper) {
    wrapper.root().update();
}
