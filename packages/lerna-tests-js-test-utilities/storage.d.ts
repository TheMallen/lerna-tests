// / <reference types="jest" />
export default class Storage {
  getItem: jest.Mock<{}>;
  setItem: jest.Mock<{}>;
  removeItem: jest.Mock<{}>;
  clear: jest.Mock<{}>;
  private store;
  restore(): void;
  private unmockedGetItem(key);
  private unmockedSetItem(key, value);
  private unmockedRemoveItem(key);
  private unmockedClearItem();
}
