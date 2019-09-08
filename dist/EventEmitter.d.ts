export interface Subscription {
    unsubscribe(): boolean;
}
export interface EventEmitter<T> {
    dispatch(event: T): void;
    subscribe(subscriber: (event: T) => void): Subscription;
    unsubscribe(subscriber: (event: T) => void): boolean;
}
export declare class Subject<T = any> implements EventEmitter<T> {
    private subscriptions;
    dispatch(event: T): void;
    subscribe(subscriber: (event: T) => void): {
        unsubscribe: () => boolean;
    };
    unsubscribe(subscriber: (event: T) => void): boolean;
}
