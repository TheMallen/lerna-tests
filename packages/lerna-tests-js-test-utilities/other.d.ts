export declare function performTimes(times: number, callback: ((time: number) => void)): void;
export declare function performTimesAsync(times: number, callback: ((time: number) => void)): Promise<void>;
export declare function withEnv<T = any>(env: string, callback: () => T): T;
export declare enum UserAgent {
    Unknown = "unknown",
    Chrome63 = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36",
    Safari11 = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0.2 Safari/604.4.7",
    IE11 = "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
}
export declare function noop(): void;
