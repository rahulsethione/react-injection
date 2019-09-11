/// <reference types="react" />
export interface ServiceType {
    new (...args: any[]): any;
}
export declare type Dependency = {
    [propName: string]: ServiceType;
};
export declare type TypedDependency<T> = {
    [key in Extract<T, string>]: ServiceType;
};
export declare type ReactComponentType<P = any> = React.FunctionComponent<P> | React.ComponentClass<P>;
