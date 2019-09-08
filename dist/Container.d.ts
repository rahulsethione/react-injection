import { Dependency, ReactComponentType, ServiceType } from "./Types";
export declare class Container {
    private serviceMap;
    private serviceIndexMap;
    static readonly rootContainer: Container;
    resolve(serviceClass: ServiceType): any;
    register(serviceClass: ServiceType, ...deps: ServiceType[]): void;
    createComponent(Klass: ReactComponentType, deps?: Dependency): ReactComponentType;
}
