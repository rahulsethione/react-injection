import { Container } from "./Container";
import { ServiceType, TypedDependency, ReactComponentType } from "./Types";
export interface ServiceMetadata {
    container?: Container;
    dependencies?: ServiceType[];
}
export interface ComponentMetadata<T> {
    container?: Container;
    dependencies: TypedDependency<T>;
}
export declare function Service(metadata?: ServiceMetadata): (constructor: ServiceType) => void;
export declare function Component<T>(metadata: ComponentMetadata<T>): (component: ReactComponentType) => any;
