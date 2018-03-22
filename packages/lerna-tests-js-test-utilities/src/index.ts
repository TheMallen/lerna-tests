import 'isomorphic-fetch';

import Clock from './clock';
import Timer from './timer';
import AnimationFrame from './animation-frame';
import Storage from './storage';
import Location from './Location';
import MatchMedia from './match-media';

export * from './other';

export const clock = new Clock();
export const timer = new Timer();
export const animationFrame = new AnimationFrame();
export const localStorage = new Storage();
export const sessionStorage = new Storage();
export const location = new Location();
export const matchMedia = new MatchMedia();
export {mediaQueryList} from './match-media';
export {noopPromise, nextEventLoopTick} from './async-helpers';
export {default as fetch} from './fetch';
