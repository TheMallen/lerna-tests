import * as React from 'react';
import * as PropTypes from 'prop-types';
import ShortcutManager from '../ShortcutManager';

export const contextTypes = {
  shortcutManager: PropTypes.instanceOf(ShortcutManager),
};

export interface Context {
  shortcutManager: ShortcutManager;
}

export interface Props {
  children?: React.ReactNode;
}

export default class Provider extends React.Component<Props, never> {
  static childContextTypes = contextTypes;
  private shortcutManager = new ShortcutManager();

  componentDidMount() {
    this.shortcutManager.setup();
  }

  getChildContext() {
    return {
      shortcutManager: this.shortcutManager,
    };
  }

  render() {
    return this.props.children;
  }
}
