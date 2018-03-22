export interface MediaMatching {
    (mediaQuery: string): Partial<MediaQueryList>;
}
export default class MatchMedia {
    isUsingFakeMatchMedia: boolean;
    originalMatchMedia: (mediaQuery: string) => MediaQueryList;
    fake(media?: MediaMatching): void;
    restore(): void;
}
export declare function mediaQueryList(values: Partial<MediaQueryList>): {
    matches: boolean;
    media: string;
    addListener: (listener: MediaQueryListListener) => void;
    removeListener: (listener: MediaQueryListListener) => void;
};
