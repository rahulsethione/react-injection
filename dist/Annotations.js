"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("./Container");
function Service(metadata) {
    if (metadata === void 0) { metadata = {}; }
    return function (constructor) {
        var _a = metadata.container, container = _a === void 0 ? Container_1.Container.rootContainer : _a, _b = metadata.dependencies, dependencies = _b === void 0 ? [] : _b;
        container.register.apply(container, __spreadArrays([constructor], dependencies));
    };
}
exports.Service = Service;
function Component(metadata) {
    return function (component) {
        var _a = metadata.container, container = _a === void 0 ? Container_1.Container.rootContainer : _a, dependencies = metadata.dependencies;
        return container.createComponent(component, dependencies);
    };
}
exports.Component = Component;
