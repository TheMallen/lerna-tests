/// <reference types="react" />
import * as React from 'react';
import { Key } from '../types';
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
    static contextTypes: {
        shortcutManager: any;
    };
    data: {
        node: HTMLElement | null | undefined;
        keys: Key[];
        ignoreInput: boolean;
        onMatch: (keys: Key[]) => void;
        allowDefault: boolean | undefined;
    };
    subscription: Subscription;
    componentDidMount(): false | undefined;
    componentWillUnmount(): void;
    render(): null;
}
