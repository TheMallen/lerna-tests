"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Make sure you understand how setImmediate works before using it.
// The promise created by this method resolves after all Synchronous operations
// and everything in the current event loop has been evaluated.
function nextEventLoopTick() {
    return new Promise(setImmediate);
}
exports.nextEventLoopTick = nextEventLoopTick;
function noopPromise() {
    return Promise.resolve();
}
exports.noopPromise = noopPromise;
//# sourceMappingURL=async-helpers.js.map