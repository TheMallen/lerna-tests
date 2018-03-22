import * as React from 'react';
import autobind from '@shopify/lerna-tests-javascript-utilities/decorators/autobind';
import Shortcut from '../../Shortcut';

interface Props {
  spy: jest.Mock<{}>;
}

interface State {
  node?: HTMLElement | null;
}

export default class ShortcutWithFocus extends React.Component<Props, State> {
  state: State = {
    node: null,
  };

  componentWillUpdate() {
    const {node} = this.state;
    if (!node) {
      return false;
    }
    node.focus();
  }

  render() {
    const {spy} = this.props;
    const {node} = this.state;
    return (
      <div className="app">
        <button ref={this.setRef} />
        <Shortcut keys={['z']} onMatch={spy} node={node} />
      </div>
    );
  }

  @autobind
  private setRef(node: HTMLElement | null) {
    this.setState({
      node,
    });
  }
}