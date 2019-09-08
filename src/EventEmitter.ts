export interface Subscription {
    unsubscribe(): boolean;
}

export interface EventEmitter<T> {
    dispatch(event: T): void;
    subscribe(subscriber: (event: T) => void): Subscription;
    unsubscribe(subscriber: (event: T) => void): boolean;
}

export class Subject<T = any> implements EventEmitter<T> {
    private subscriptions: Map<(event: T) => void, Subscription> = new Map();
    
    dispatch(event: T) {
        this.subscriptions.forEach((subscription: Subscription, subscriber: (event: T) => void) => subscriber(event));
    }

    subscribe(subscriber: (event: T) => void) {
        const subscription = {
            unsubscribe: () => {
                return this.subscriptions.delete(subscriber);
            }
        }

        this.subscriptions.set(subscriber, subscription);

        return subscription;
    }

    unsubscribe(subscriber: (event: T) => void) {
        return this.subscriptions.delete(subscriber);
    }
}