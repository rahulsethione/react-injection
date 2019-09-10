"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Container = (function () {
    function Container() {
        this.serviceMap = new WeakMap();
        this.serviceInjectionMap = new WeakMap();
    }
    Container.prototype.resolve = function (serviceClass) {
        if (!this.serviceMap.has(serviceClass)) {
            this.register(serviceClass);
        }
        else {
            return this.serviceMap.get(serviceClass);
        }
        return this.resolve(serviceClass);
    };
    Container.prototype.register = function (serviceClass) {
        var _this = this;
        var injectablesMap = this.serviceInjectionMap.get(serviceClass);
        var service = new serviceClass();
        injectablesMap.forEach(function (injectableService, property) {
            Object.defineProperty(service, property, {
                value: _this.resolve(injectableService),
                enumerable: true,
                configurable: true,
                writable: false
            });
        });
        this.serviceMap.set(serviceClass, service);
    };
    Container.prototype.createComponent = function (Klass, deps) {
        var _this = this;
        if (deps === void 0) { deps = {}; }
        var services = {};
        Object.keys(deps).forEach(function (key) {
            Object.defineProperty(services, key, { configurable: true, enumerable: true, writable: false, value: _this.resolve(deps[key]) });
        });
        return function (props) { return react_1.default.createElement(Klass, __assign({}, services, props)); };
    };
    Container.prototype.autowire = function (targetService, property, injectableService) {
        if (!this.serviceInjectionMap.has(targetService)) {
            this.serviceInjectionMap.set(targetService, new Map());
        }
        ;
        this.serviceInjectionMap.get(targetService).set(property, injectableService);
    };
    Container.rootContainer = new Container();
    return Container;
}());
exports.Container = Container;
