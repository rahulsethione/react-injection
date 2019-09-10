import { Container } from "./Container";
import { ServiceType, TypedDependency, ReactComponentType } from "./Types";
export interface ServiceMetadata {
    container?: Container;
}
export interface ComponentMetadata<T> {
    container?: Container;
    dependencies: TypedDependency<T>;
}
export interface AutowiredMetadata {
    container?: Container;
    service: ServiceType;
}
export declare function Service(metadata?: ServiceMetadata): (constructor: ServiceType) => void;
export declare function Component<T>(metadata: ComponentMetadata<T>): (component: ReactComponentType) => any;
export declare function Autowired(metadata: AutowiredMetadata): (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<ServiceType>) => void;
