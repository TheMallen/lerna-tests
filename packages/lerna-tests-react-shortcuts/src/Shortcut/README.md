---
name: Shortcut
---

# Shortcut

Shortcut is used to register a new keyboard shortcut to `ShortcutManager`. It can be triggered globally or only when a node is focused.

## Problem

Merchants need an efficient way to navigate or perform a task using their keyboard.

## Solution

Create a shortcut to allow merchants to easily perform a common operation.

## Examples

### Basic example

```
function logFoo() {
  console.log('foo');
}
<Shortcut key={['f', 'o', 'o']} onMatch={logFoo} />
```

### On a focused node
Provide a node in the form of a `ref`. `Shortcut` will automatically subscribe to the `ShortcutManager` once the node is available.
```
function logFoo() {
  console.log('foo);
}
<button ref={(node) => this.state.fooNode = node}>
<Shortcut node={this.state.fooNode} key={['f', 'o', 'o']} onMatch={logFoo} />
```
