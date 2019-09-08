import React from "react";
import { Container } from "./Container";
import { ServiceType, TypedDependency, ReactComponentType } from "./Types";

export interface ServiceMetadata {
    container?: Container
    dependencies?: ServiceType[];
}

export interface ComponentMetadata<T> {
    container?: Container
    dependencies: TypedDependency<T>;
}

export function Service(metadata: ServiceMetadata = {}) {
    return function (constructor: ServiceType): void {
        const { container = Container.rootContainer, dependencies = [] } = metadata;
        container.register(constructor, ...dependencies);
    }
}

export function Component<T>(metadata: ComponentMetadata<T>) {
    return function (component: ReactComponentType): any {
        const { container = Container.rootContainer, dependencies } = metadata;
        return container.createComponent(component, dependencies);
    }
}