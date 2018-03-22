import {Key} from '../types';

export interface Data {
  node: HTMLElement | null | undefined;
  keys: Key[];
  ignoreInput: boolean;
  onMatch(): void;
  allowDefault: boolean;
}
export default class ShortcutManager {
  private keysPressed;
  private shortcuts;
  private shortcutsMatched;
  private timer;
  setup(): void;
  subscribe(
    data: Data,
  ): {
    unsubscribe(): void;
  };
  private resetKeys();
  private handleKeyDown(event);
  private updateMatchingShortcuts();
  private callMatchedShortcut(event);
}
