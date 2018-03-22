// Make sure you understand how setImmediate works before using it.
// The promise created by this method resolves after all Synchronous operations
// and everything in the current event loop has been evaluated.
export function nextEventLoopTick() {
  return new Promise(setImmediate);
}

export function noopPromise() {
  return Promise.resolve();
}
