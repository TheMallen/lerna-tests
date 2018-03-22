"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetchMock = require("fetch-mock");
var mockSpies = [
    jest.spyOn(fetchMock, 'mock'),
    jest.spyOn(fetchMock, 'get'),
    jest.spyOn(fetchMock, 'put'),
    jest.spyOn(fetchMock, 'post'),
    jest.spyOn(fetchMock, 'delete'),
];
var restoreSpy = jest.spyOn(fetchMock, 'restore');
function isMocked() {
    var wasMocked = mockSpies.some(function (spy) { return spy.mock.calls.length > 0; });
    var wasRestored = restoreSpy.mock.calls.length > 0;
    return wasMocked && !wasRestored;
}
var augmentedFetchMock = fetchMock;
augmentedFetchMock.isMocked = isMocked;
exports.default = augmentedFetchMock;
//# sourceMappingURL=fetch.js.map