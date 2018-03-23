/// <reference types="react" />
import * as React from 'react';
import ShortcutManager from '../ShortcutManager';
export declare const contextTypes: {
    shortcutManager: any;
};
export interface Context {
    shortcutManager: ShortcutManager;
}
export interface Props {
    children?: React.ReactNode;
}
export default class Provider extends React.Component<Props, never> {
    static childContextTypes: {
        shortcutManager: any;
    };
    private shortcutManager;
    componentDidMount(): void;
    getChildContext(): {
        shortcutManager: ShortcutManager;
    };
    render(): React.ReactNode;
}
