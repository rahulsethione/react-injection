import { Dependency, ReactComponentType, ServiceType } from "./Types";
export declare type InjectablesMap = Map<string, ServiceType>;
export declare class Container {
    private serviceMap;
    private serviceInjectionMap;
    static readonly rootContainer: Container;
    resolve(serviceClass: ServiceType): any;
    register(serviceClass: ServiceType): void;
    createComponent(Klass: ReactComponentType, deps?: Dependency): ReactComponentType;
    autowire(targetService: ServiceType, property: string, injectableService: ServiceType): void;
}
