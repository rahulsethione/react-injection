export interface ServiceType { new(...args: any[]): any }
export type Dependency = { [propName: string]: ServiceType }
export type TypedDependency<T> = { [key in Extract<T, string>]: ServiceType };
export type ReactComponentType<P = any> = React.FunctionComponent<P> | React.ComponentClass<P>;