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
    service: ServiceType;
}
export declare function Service(metadata?: ServiceMetadata): (constructor: ServiceType) => void;
export declare function Component<T>(metadata: ComponentMetadata<T>): (component: ReactComponentType) => any;
export declare function Autowire(metadata: AutowireMetadata): (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<ServiceType>) => void;
