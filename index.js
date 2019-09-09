const { Container } = require('./dist/Container');
const { Subject } = require('./dist/EventEmitter');
const { Component, Service, Autowire } = require('./dist/Annotations');

module.exports = {
    Container,
    Subject,
    Component,
    Service,
    Autowire
};