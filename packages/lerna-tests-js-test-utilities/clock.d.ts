export default class Clock {
    isUsingFakeClock: boolean;
    private fakedClock?;
    fake(): void;
    restore(): void;
    fakeClock(now?: number | Date): void;
    restoreClock(): void;
    tick(time: number): void;
    setTime(time: number): void;
    private ensureClockIsFake();
}
