import React from "react";
import { Container } from "./Container";
import { ServiceType, TypedDependency, ReactComponentType } from "./Types";

export interface ServiceMetadata {
    container?: Container;
}

export interface ComponentMetadata<T> {
    container?: Container;
    dependencies: TypedDependency<T>;
}

export interface AutowireMetadata {
    container?: Container;
    service: ServiceType
}

export function Service(metadata: ServiceMetadata = {}) {
    return function (constructor: ServiceType): void {
        const { container = Container.rootContainer } = metadata;
        container.register(constructor);
    }
}

export function Component<T>(metadata: ComponentMetadata<T>) {
    return function (component: ReactComponentType): any {
        const { container = Container.rootContainer, dependencies } = metadata;
        return container.createComponent(component, dependencies);
    }
}

export function Autowire(metadata: AutowireMetadata) {
    return function(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<ServiceType>) {
        const { container = Container.rootContainer, service } = metadata;
        container.autowire(target.constructor as ServiceType, propertyName, service);
    }
}