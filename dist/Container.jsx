"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Container = (function () {
    function Container() {
        this.serviceMap = new Map();
        this.serviceIndexMap = new Map();
    }
    Container.prototype.resolve = function (serviceClass) {
        if (!this.serviceMap.has(serviceClass)) {
            this.register.apply(this, __spreadArrays([serviceClass], (this.serviceIndexMap.get(serviceClass) || [])));
        }
        else {
            return this.serviceMap.get(serviceClass);
        }
        return this.resolve(serviceClass);
    };
    Container.prototype.register = function (serviceClass) {
        var _this = this;
        var deps = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            deps[_i - 1] = arguments[_i];
        }
        this.serviceIndexMap.set(serviceClass, deps || []);
        var service = Reflect.construct(serviceClass, (deps || []).map(function (dep) { return _this.resolve(dep); }));
        this.serviceMap.set(serviceClass, service);
    };
    Container.prototype.createComponent = function (Klass, deps) {
        var _this = this;
        if (deps === void 0) { deps = {}; }
        var services = {};
        Object.keys(deps).forEach(function (key) {
            Object.defineProperty(services, key, { configurable: true, enumerable: true, writable: false, value: _this.resolve(deps[key]) });
        });
        return function (props) { return <Klass {...services} {...props}/>; };
    };
    Container.rootContainer = new Container();
    return Container;
}());
exports.Container = Container;
