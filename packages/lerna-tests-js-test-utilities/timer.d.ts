export default class Timer {
    isUsingFakeTimer: boolean;
    fake(): void;
    restore(): void;
    runAllTimers(): void;
    runTimersToTime(time: number): void;
    private ensureTimerIsFake();
}
