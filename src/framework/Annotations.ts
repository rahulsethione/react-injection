import React, { FunctionComponent } from "react";
import { Container } from "./Container";

declare type Dependency = { [propName: string]: Function };
declare type TypedDependency<T> = { [key in keyof T]: Function };

export interface ServiceMetadata {
    container?: Container
    dependencies?: Function[];
}

export interface ComponentMetadata<T> {
    container?: Container
    dependencies: TypedDependency<T>;
}

export function Service(metadata: ServiceMetadata = {}) {
    return function (constructor: { new(...args: any[]) }) {
        const { container = Container.rootContainer, dependencies = [] } = metadata;
        container.register(constructor, ...dependencies);
    }
}

export function Component<T>(metadata: ComponentMetadata<T>) {
    return function (component: React.ComponentClass | FunctionComponent) {
        const { container = Container.rootContainer, dependencies } = metadata;
        return container.createComponent(component, dependencies);
    }
}