import React from 'react';
import { Dependency, ReactComponentType, ServiceType } from "./Types";

export type InjectablesMap = Map<string, ServiceType>;

export class Container {
    private serviceMap: WeakMap<ServiceType, any> = new WeakMap();
    private serviceInjectionMap: WeakMap<ServiceType, InjectablesMap> = new WeakMap();

    public static readonly rootContainer: Container = new Container();

    public resolve(serviceClass: ServiceType): any {
        if (!this.serviceMap.has(serviceClass)) {
            this.register(serviceClass);
        } else {
            return this.serviceMap.get(serviceClass);
        }

        return this.resolve(serviceClass);
    }

    public register(serviceClass: ServiceType) {
        const injectablesMap = this.serviceInjectionMap.get(serviceClass);

        const service = new serviceClass();

        injectablesMap && injectablesMap.forEach((injectableService, property) => {
            Object.defineProperty(service, property, {
                value: this.resolve(injectableService),
                enumerable: true,
                configurable: true,
                writable: false
            });
        });
        
        this.serviceMap.set(serviceClass, service);
    }

    public createComponent<T>(Klass: ReactComponentType<T>, deps: Dependency = {}): ReactComponentType<Partial<T>> {
        const services = {};

        Object.keys(deps).forEach(key => {
            Object.defineProperty(services, key, { configurable: true, enumerable: true, writable: false, value: this.resolve(deps[key]) });
        });

        return (props: any) => <Klass {...services} {...props} />;
    }

    public autowire(targetService: ServiceType, property: string, injectableService: ServiceType) {
        if(!this.serviceInjectionMap.has(targetService)) {
            this.serviceInjectionMap.set(targetService, new Map());
        };

        this.serviceInjectionMap.get(targetService).set(property, injectableService);
    }
}