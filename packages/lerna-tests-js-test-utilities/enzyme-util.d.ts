import { ReactWrapper, CommonWrapper } from 'enzyme';
export declare type AnyWrapper = ReactWrapper<any, any> | CommonWrapper<any, any>;
export declare function findByTestID(root: ReactWrapper<any, any>, id: string): ReactWrapper<any, any>;
export declare function matchByTestID(root: ReactWrapper<any, any>, regexp: RegExp): ReactWrapper<any, any>;
export declare function trigger(wrapper: AnyWrapper, keypath: string, ...args: any[]): any;
/**
 * This is needed for updating the enzyme wrapper and react instance when we deeply change the context.
 * root.update() should work, but it doesn't currently (see https://github.com/airbnb/enzyme/issues/1329).
 */
export declare function forceUpdate(root: AnyWrapper): void;
export interface ReactWrapperPredicate {
    (wrapper: ReactWrapper<any, any>): boolean;
}
