import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/lerna-tests-javascript-utilities/events';
import {matches} from '@shopify/lerna-tests-javascript-utilities/dom';

// eslint-disable-line no-require-imports
import Promiselike = require('core-js/library/es6/promise');

const TICK = 17;
const DEV_TIMEOUT = 2000;

export enum TransitionStatus {
  Hidden = 1,
  Shown,
  AppearingStart,
  Appearing,
  EnteringStart,
  Entering,
  LeavingStart,
  Leaving,
}

export type Nullable<T> = T | null;

export interface Transitionable {
  transitionStatus: TransitionStatus;
}

export interface State extends Transitionable {
  nextStatus: Nullable<TransitionStatus>;
  nextResolve: Nullable<(arg: any) => void>;
  nextReject: Nullable<(error: any) => void>;
}

export interface Props {
  skipLeaving?: boolean;
  skipEntering?: boolean;
  skipAppearing?: boolean;
  selector?: string;
  onTransitionEnd?(transitionStatus: TransitionStatus): void;
  render(transitionStatus: TransitionStatus): React.ReactElement<any>;
}

export default class TransitionChild extends React.Component<Props, State> {
  state: State = {
    transitionStatus: TransitionStatus.Hidden,
    nextStatus: null,
    nextResolve: null,
    nextReject: null,
  };

  private hasUnMounted = false;

  componentDidUpdate() {
    const {nextResolve, nextReject, nextStatus} = this.state;

    if (nextResolve == null || nextReject == null || nextStatus == null) {
      return;
    }

    const node = ReactDOM.findDOMNode(this);

    const callback = (event: TransitionEvent) => {
      const {target} = event;
      const {selector} = this.props;

      if (event.elapsedTime === 0) {
        return;
      }
      if (target !== node && !targetMatchesSelector(target, selector)) {
        return;
      }

      removeEventListener(node, 'animationend', callback);
      removeEventListener(node, 'transitionend', callback);
      nextResolve(event);
    };

    addEventListener(node, 'transitionend', callback);
    addEventListener(node, 'animationend', callback);

    if (
      // eslint-disable-next-line no-process-env
      process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined'
    ) {
      setTimeout(() => {
        removeEventListener(node, 'animationend', callback);
        removeEventListener(node, 'transitionend', callback);
        return nextReject(
          new Error(
            'Timeout ended without an animation or transition finishing.',
          ),
        );
      }, DEV_TIMEOUT);
    }

    // We need this timeout so that react doesn't batch our renders!
    setTimeout(() => {
      if (this.hasUnMounted) {
        return;
      }

      this.setState({
        nextResolve: null,
        nextReject: null,
        nextStatus: null,
        transitionStatus: nextStatus,
      });
    }, TICK);
  }

  async componentWillAppear(callback: Function) {
    if (this.props.skipAppearing) {
      callback();
      return;
    }

    const event = await this.transitionBetweenStates(
      TransitionStatus.AppearingStart,
      TransitionStatus.Appearing,
    );

    callback(event);
  }

  componentDidAppear() {
    this.setState({transitionStatus: TransitionStatus.Shown});
    const {onTransitionEnd} = this.props;
    if (onTransitionEnd) {
      onTransitionEnd(TransitionStatus.Shown);
    }
  }

  async componentWillEnter(callback: Function) {
    if (this.props.skipEntering) {
      callback();
      return;
    }

    const event = await this.transitionBetweenStates(
      TransitionStatus.EnteringStart,
      TransitionStatus.Entering,
    );

    callback(event);
  }

  componentDidEnter() {
    this.setState({transitionStatus: TransitionStatus.Shown});
    const {onTransitionEnd} = this.props;
    if (onTransitionEnd) {
      onTransitionEnd(TransitionStatus.Shown);
    }
  }

  async componentWillLeave(callback: Function) {
    if (this.props.skipLeaving) {
      callback();
      return;
    }

    const event = await this.transitionBetweenStates(
      TransitionStatus.LeavingStart,
      TransitionStatus.Leaving,
    );

    callback(event);
  }

  componentDidLeave() {
    this.setState({transitionStatus: TransitionStatus.Hidden});
    const {onTransitionEnd} = this.props;
    if (onTransitionEnd) {
      onTransitionEnd(TransitionStatus.Hidden);
    }
  }

  componentWillUnmount() {
    const {skipLeaving, onTransitionEnd} = this.props;
    if (skipLeaving && onTransitionEnd) {
      onTransitionEnd(TransitionStatus.Hidden);
    }
    this.hasUnMounted = true;
  }

  render() {
    const {render} = this.props;
    const {transitionStatus} = this.state;

    return render(transitionStatus);
  }

  private transitionBetweenStates(
    startStatus: TransitionStatus,
    activeStatus: TransitionStatus,
  ) {
    return new Promiselike<Event>((resolve, reject) => {
      this.setState({
        transitionStatus: startStatus,
        nextResolve: resolve,
        nextReject: reject,
        nextStatus: activeStatus,
      });
    });
  }
}

function targetMatchesSelector(
  target: EventTarget,
  selector: string | null | undefined,
) {
  return selector && matches(target as HTMLElement, selector);
}
