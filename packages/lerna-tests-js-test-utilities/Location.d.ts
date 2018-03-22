/// <reference types="jest" />
export default class Location {
    isUsingFakeLocation: boolean;
    originalAssign: typeof window.location.assign;
    mock: jest.Mock<{}> | null;
    fake(): void;
    restore(): void;
}
