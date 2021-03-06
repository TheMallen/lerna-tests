import * as React from 'react';
import {contextTypes} from '../Provider';
import {Key} from '../types';

export interface Props {
  keys: Key[];
  node?: HTMLElement | null;
  ignoreInput?: boolean;
  onMatch(keys: Key[]): void;
  allowDefault?: boolean;
}

export interface Subscription {
  unsubscribe(): void;
}

export default class Shortcut extends React.Component<Props, never> {
  static contextTypes = contextTypes;
  public data = {
    node: this.props.node,
    keys: this.props.keys,
    ignoreInput: this.props.ignoreInput || false,
    onMatch: this.props.onMatch,
    allowDefault: this.props.allowDefault,
  };
  public subscription: Subscription;

  componentDidMount() {
    const {node} = this.data;

    if (node != null) {
      return;
    }

    const {shortcutManager} = this.context;
    this.subscription = shortcutManager.subscribe(this.data);
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    return null;
  }
}
