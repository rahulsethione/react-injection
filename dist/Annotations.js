"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("./Container");
function Service(metadata) {
    if (metadata === void 0) { metadata = {}; }
    return function (constructor) {
        var _a = metadata.container, container = _a === void 0 ? Container_1.Container.rootContainer : _a;
        container.register(constructor);
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
function Autowire(metadata) {
    return function (target, propertyName, descriptor) {
        var _a = metadata.container, container = _a === void 0 ? Container_1.Container.rootContainer : _a, service = metadata.service;
        container.autowire(target.constructor, propertyName, service);
    };
}
exports.Autowire = Autowire;
