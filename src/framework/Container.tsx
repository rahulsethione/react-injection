import React from 'react';
import { Dependency, ReactComponentType, ServiceType } from "./Types";

export class Container {
    private serviceMap: WeakMap<ServiceType, any> = new Map();
    private serviceIndexMap: WeakMap<ServiceType, Array<ServiceType>> = new Map();

    public static readonly rootContainer: Container = new Container();

    public resolve(serviceClass: ServiceType): any {
        if (!this.serviceMap.has(serviceClass)) {
            this.register(serviceClass, ...this.serviceIndexMap.get(serviceClass));
        } else {
            return this.serviceMap.get(serviceClass);
        }

        return this.resolve(serviceClass);
    }

    public register(serviceClass: ServiceType, ...deps: ServiceType[]) {
        this.serviceIndexMap.set(serviceClass, deps || []);

        const service = Reflect.construct(serviceClass, (deps || []).map(dep => this.resolve(dep)));
        this.serviceMap.set(serviceClass, service);
    }

    public createComponent(Klass: ReactComponentType, deps: Dependency = {}): ReactComponentType {
        const services = {};

        Object.keys(deps).forEach(key => {
            Object.defineProperty(services, key, { configurable: true, enumerable: true, writable: false, value: this.resolve(deps[key]) });
        });

        return (props: any) => <Klass {...services} {...props} />;
    }
}