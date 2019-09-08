"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject = (function () {
    function Subject() {
        this.subscriptions = new Map();
    }
    Subject.prototype.dispatch = function (event) {
        this.subscriptions.forEach(function (subscription, subscriber) { return subscriber(event); });
    };
    Subject.prototype.subscribe = function (subscriber) {
        var _this = this;
        var subscription = {
            unsubscribe: function () {
                return _this.subscriptions.delete(subscriber);
            }
        };
        this.subscriptions.set(subscriber, subscription);
        return subscription;
    };
    Subject.prototype.unsubscribe = function (subscriber) {
        return this.subscriptions.delete(subscriber);
    };
    return Subject;
}());
exports.Subject = Subject;
