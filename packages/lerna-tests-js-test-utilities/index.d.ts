import 'isomorphic-fetch';
import Clock from './clock';
import Timer from './timer';
import AnimationFrame from './animation-frame';
import Storage from './storage';
import Location from './Location';
import MatchMedia from './match-media';

export * from './other';
export declare const clock: Clock;
export declare const timer: Timer;
export declare const animationFrame: AnimationFrame;
export declare const localStorage: Storage;
export declare const sessionStorage: Storage;
export declare const location: Location;
export declare const matchMedia: MatchMedia;
export {mediaQueryList} from './match-media';
export {noopPromise, nextEventLoopTick} from './async-helpers';
export {default as fetch} from './fetch';
