import { ReactComponentLike } from "prop-types";

export interface ServiceType { new(...args: any[]): any }
export type Dependency = { [propName: string]: ServiceType }
export type TypedDependency<T> = { [key in Extract<T, string>]: ServiceType };
export type ReactComponentType = React.FunctionComponent | React.ComponentClass | ReactComponentLike;