import React, { FunctionComponent, ComponentClass } from 'react';

declare type ReactComponentType = string | FunctionComponent<{}> | ComponentClass<{}, any>;
declare type Dependency = { [propName: string]: Function };

export class Container {
    private serviceMap: WeakMap<Function, any> = new Map();
    private serviceIndexMap: WeakMap<Function, Array<Function>> = new Map();

    public static readonly rootContainer: Container = new Container();

    public resolve(serviceClass: Function): any {
        if (!this.serviceMap.has(serviceClass)) {
            this.register(serviceClass, ...this.serviceIndexMap.get(serviceClass));
        } else {
            return this.serviceMap.get(serviceClass);
        }

        return this.resolve(serviceClass);
    }

    public register(serviceClass: Function, ...deps: Function[]) {
        this.serviceIndexMap.set(serviceClass, deps || []);

        const service = Reflect.construct(serviceClass, (deps || []).map(dep => this.resolve(dep)));
        this.serviceMap.set(serviceClass, service);
    }

    public createComponent(Klass: ReactComponentType, deps: Dependency = {}): any {
        const services = {};

        Object.keys(deps).forEach(key => {
            Object.defineProperty(services, key, { configurable: true, enumerable: true, writable: false, value: this.resolve(deps[key]) });
        });

        return (props: any) => <Klass {...services} {...props} />;
    }
}