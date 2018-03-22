import {addEventListener} from '@shopify/lerna-tests-javascript-utilities/events';
import autobind from '@shopify/lerna-tests-javascript-utilities/decorators/autobind';
import {isEqual, take} from 'lodash';
import {Key} from '../types';

export interface Data {
  node: HTMLElement | null | undefined;
  keys: Key[];
  ignoreInput: boolean;
  onMatch(): void;
  allowDefault: boolean;
}

export default class ShortcutManager {
  private keysPressed: Key[] = [];
  private shortcuts: Data[] = [];
  private shortcutsMatched: Data[] = [];
  private timer: number;

  setup() {
    addEventListener(document, 'keydown', this.handleKeyDown);
  }

  subscribe(data: Data) {
    this.shortcuts.push(data);
    const self = this;

    return {
      unsubscribe() {
        const unsubscribeIndex = self.shortcuts.findIndex(
          shortcut => shortcut === data,
        );
        self.shortcuts.splice(unsubscribeIndex, 1);
      },
    };
  }

  private resetKeys() {
    this.keysPressed = [];
    this.shortcutsMatched = [];
  }

  @autobind
  private handleKeyDown(event: Event) {
    const {key} = event as KeyboardEvent;

    this.keysPressed.push(key as Key);
    this.updateMatchingShortcuts();

    switch (this.shortcutsMatched.length) {
      case 0:
        this.resetKeys();
        break;
      case 1:
        this.callMatchedShortcut(event);
        break;
      default:
        this.timer = window.setTimeout(() => {
          this.callMatchedShortcut(event);
        }, 500);
    }
  }

  private updateMatchingShortcuts() {
    const shortcuts =
      this.shortcutsMatched.length > 0 ? this.shortcutsMatched : this.shortcuts;

    this.shortcutsMatched = shortcuts.filter(({keys, node, ignoreInput}) => {
      if (isFocusedInput() && !ignoreInput) {
        return false;
      }

      const partiallyMatching = isEqual(
        this.keysPressed,
        take(keys, this.keysPressed.length),
      );

      if (node) {
        const onFocusedNode = isEqual(document.activeElement, node);
        return partiallyMatching && onFocusedNode;
      }
      return partiallyMatching;
    });
  }

  private callMatchedShortcut(event: Event) {
    const longestMatchingShortcut = this.shortcutsMatched.find(({keys}) =>
      isEqual(keys, this.keysPressed),
    );

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
  }
}

function isFocusedInput() {
  const target = document.activeElement;
  if (target.tagName == null) {
    return false;
  }

  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'SELECT' ||
    target.tagName === 'TEXTAREA' ||
    target.hasAttribute('contenteditable')
  );
}
