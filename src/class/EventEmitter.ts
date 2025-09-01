const _subscriptions = Symbol("subscriptions");
const _oneTimeEvents = Symbol("oneTimeEvents");

export type SubscriptionCallback<T extends Array<any> = any[]> = ((...arg: T) => void) & {};

export interface EventHandler {
    stop: () => void;
    remove: () => void;
}

function runCallback<T extends Array<any> = any[]>(callback: SubscriptionCallback<T>, ...arg: T) {
    callback(...arg);
}

export type EventsListenersParameters<T extends Record<any, (...arg: any[]) => void> = Record<any, (...arg: any[]) => void>> = {
    [key in keyof T]: Parameters<T[key]>;
} & {};

export type EventsListeners<T extends Record<any, any[]> = Record<any, any[]>> = {
    [key in keyof T]: T[key];
} & {};

/**
 * EventEmitter class
 */
export class EventEmitter<T extends EventsListeners | EventsListenersParameters = any> {
    private [_subscriptions]: {
        event: keyof T;
        callback: SubscriptionCallback;
        once: boolean;
    }[];

    private [_oneTimeEvents]: Map<keyof T, T[keyof T]>;

    private _ready: boolean = false;

    /**
     * Create a new EventEmitter
     */
    constructor() {
        this[_subscriptions] = [];
        this[_oneTimeEvents] = new Map();

        this.on("internal_ready", () => {
            this._ready = true;
        });
    }

    /**
     * Wait for the emitter to be ready
     * @param callback Callback to call when the emitter is ready
     * @returns Promise
     *
     * @example
     * const emitter = new EventEmitter<{}>();
     *
     * emitter.ready(() => {
     *     console.log("Emitter is ready");
     * });
     *
     * emitter.prepared = true;
     * // Output: Emitter is ready
     */
    async ready<R = never>(callback?: () => R | Promise<R>): Promise<R> {
        if (this._ready) {
            const response = await callback?.();
            return Promise.resolve(response as any);
        }

        return new Promise((resolve) => {
            this.once("internal_ready", (async () => {
                const response = await callback?.();
                resolve(response as any);
            }) as any);
        });
    }

    /**
     * Property to get the emitter as prepared
     * @returns boolean
     *
     * @example
     * const emitter = new EventEmitter<{}>();
     *
     * emitter.ready(() => {
     *      console.log("Emitter is ready");
     * });
     *
     * console.log(emitter.prepared);
     * // Output: false
     *
     * emitter.prepared = true;
     * console.log(emitter.prepared);
     * // Output: true
     */
    get prepared() {
        return this._ready;
    }

    /**
     * Property to set the emitter as prepared
     * @param value Value to set
     *
     * @example
     * const emitter = new EventEmitter<{}>();
     *
     * emitter.ready(() => {
     *      console.log("Emitter is ready");
     * });
     *
     * emitter.prepared = true;
     * // Output: Emitter is ready
     */
    set prepared(value: boolean) {
        if (value === true) {
            (this.emit as any)("internal_ready");
        }
        this._ready = value;
    }

    /**
     * Clear all events
     * @returns void
     * @example
     * const emitter = new EventEmitter<{}>();
     * emitter.clearEvents();
     * // All events are cleared
     */
    clearEvents() {
        this[_subscriptions] = [];
        this[_oneTimeEvents].clear();
    }

    /**
     * Add a listener to an event
     * @param event Event to listen to
     * @param callback Callback to call when the event is emitted
     * @returns EventHandler
     * @example
     * const emitter = new EventEmitter<{
     *      greet: [name: string];
     *      farewell: [name: string];
     * }>();
     *
     * emitter.on("greet", (name) => {
     *      console.log(`Hello, ${name}!`);
     * });
     *
     * emitter.emit("greet", "Alice");
     * // Output: Hello, Alice!
     */
    on<K extends keyof T>(event: K, callback: SubscriptionCallback<T[K]>): EventHandler {
        if (this[_oneTimeEvents].has(event)) {
            runCallback(callback, ...((this[_oneTimeEvents].get(event) ?? []) as T[K]));
        } else {
            this[_subscriptions].push({ event, callback: callback as any, once: false });
        }
        const self = this;
        return {
            stop() {
                self.off(event, callback as any);
            },
            remove() {
                this.stop();
            },
        };
    }

    /**
     * Remove a listener from an event
     * @param event Event to remove the listener from
     * @param callback Callback to remove
     * @returns EventEmitter
     *
     * @example
     * const emitter = new EventEmitter<{
     *      greet: [name: string];
     *      farewell: [name: string];
     * }>();
     *
     * const listener = (name) => {
     *      console.log(`Hello, ${name}!`);
     * }
     *
     * emitter.on("greet", listener);
     * emitter.off("greet", listener);
     *
     * emitter.emit("greet", "Alice");
     * // No output
     */
    off<K extends keyof T>(event: K, callback?: SubscriptionCallback<T[K]>): EventEmitter<T> {
        this[_subscriptions] = this[_subscriptions].filter((s) => s.event !== event || (callback && s.callback !== callback));
        return this;
    }

    /**
     * Add a listener that will be removed after being called once
     * @param event Event to listen to
     * @param callback Callback to call when the event is emitted
     * @returns Promise that resolves when the event is emitted
     * @example
     * const emitter = new EventEmitter<{
     *      greet: [name: string];
     *      farewell: [name: string];
     * }>();
     *
     * emitter.once("greet", (name) => {
     *      console.log(`Hello, ${name}!`);
     * });
     *
     * emitter.emit("greet", "Alice");
     * // Output: Hello, Alice!
     */
    once<K extends keyof T, R = any>(event: K, callback?: (...args: T[K]) => R): Promise<typeof callback extends undefined ? undefined : R> {
        return new Promise<any>((resolve) => {
            const ourCallback = (...arg: T[K]) => {
                const r = callback?.(...arg);
                resolve(r);
            };
            if (this[_oneTimeEvents].has(event)) {
                runCallback(ourCallback, ...((this[_oneTimeEvents].get(event) ?? []) as T[K]));
            } else {
                this[_subscriptions].push({
                    event,
                    callback: ourCallback as any,
                    once: true,
                });
            }
        });
    }

    /**
     * Remove a listener that was added with `once`
     * @param event Event to remove the listener from
     * @param callback Callback to remove
     * @returns EventEmitter
     *
     * @example
     * const emitter = new EventEmitter<{
     *      greet: [name: string];
     *      farewell: [name: string];
     * }>();
     *
     * const listener = (name) => {
     *      console.log(`Hello, ${name}!`);
     * }
     *
     * emitter.once("greet", listener);
     * emitter.offOnce("greet", listener);
     */
    offOnce<K extends keyof T>(event: K, callback?: (...args: T[K]) => any): EventEmitter<T> {
        this[_subscriptions] = this[_subscriptions].filter((s) => s.event !== event || (callback && s.callback !== callback) || !s.once);
        return this;
    }

    /**
     * Emit an event
     * @param event Event to emit
     * @param arg Arguments to pass to the event
     * @returns EventEmitter
     * @example
     * const emitter = new EventEmitter<{
     *      greet: [name: string];
     *      farewell: [name: string];
     * }>();
     *
     * emitter.on("greet", (name) => {
     *      console.log(`Hello, ${name}!`);
     * });
     *
     * emitter.emit("greet", "Alice");
     * // Output: Hello, Alice!
     */
    emit<K extends keyof T>(event: K, ...arg: T[K]): EventEmitter<T> {
        if (this[_oneTimeEvents].has(event)) {
            throw new Error(`Event "${String(event)}" was supposed to be emitted only once`);
        }
        for (let i = 0; i < this[_subscriptions].length; i++) {
            const s = this[_subscriptions][i];
            if (s.event !== event) {
                continue;
            }
            runCallback(s.callback, ...arg);
            if (s.once) {
                this[_subscriptions].splice(i, 1);
                i--;
            }
        }
        return this;
    }

    /**
     * Emit an event only once
     * @param event Event to emit
     * @param arg Arguments to pass to the event
     * @returns EventEmitter
     * @example
     * const emitter = new EventEmitter<{
     *      greet: [name: string];
     *      farewell: [name: string];
     * }>();
     *
     * emitter.emitOnce("greet", "Alice");
     * emitter.on("greet", (name) => {
     *      console.log(`Hello, ${name}!`);
     * });
     *
     * emitter.emit("greet", "Bob");
     * // Output: Hello, Alice!
     */
    emitOnce<K extends keyof T>(event: K, ...arg: T[K]): EventEmitter<T> {
        if (this[_oneTimeEvents].has(event)) {
            throw new Error(`Event "${String(event)}" was supposed to be emitted only once`);
        }
        this.emit(event, ...arg);
        this[_oneTimeEvents].set(event, arg); // Mark event as being emitted once for future subscribers
        this.offOnce(event); // Remove all listeners for this event, they won't fire again
        return this;
    }

    /**
     * Pipe events from one emitter to another
     * @param event Event to pipe
     * @param eventEmitter Emitter to pipe to
     * @returns BasicEventHandler
     * @example
     * const emitter = new EventEmitter<{
     *      greet: [name: string];
     *      farewell: [name: string];
     * }>();
     *
     * const anotherEmitter = new EventEmitter<{
     *      greet: [name: string];
     *      farewell: [name: string];
     * }>();
     *
     * emitter.pipe("greet", anotherEmitter);
     *
     * anotherEmitter.on("greet", (name) => {
     *      console.log(`Hello, ${name}!`);
     * });
     *
     * emitter.emit("greet", "Alice");
     * // Output: Hello, Alice!
     */
    pipe<K extends keyof T>(event: K, eventEmitter: EventEmitter<T>) {
        return this.on(event, (...arg: T[K]) => {
            eventEmitter.emit(event, ...arg);
        });
    }

    /**
     * Pipe events from one emitter to another, but only once
     * @param event Event to pipe
     * @param eventEmitter Emitter to pipe to
     * @returns Promise that resolves when the event is emitted
     * @example
     * const emitter = new EventEmitter<{
     *      greet: [name: string];
     *      farewell: [name: string];
     * }>();
     *
     * const anotherEmitter = new EventEmitter<{
     *      greet: [name: string];
     *      farewell: [name: string];
     * }>();
     *
     * emitter.pipeOnce("greet", anotherEmitter);
     *
     * anotherEmitter.on("greet", (name) => {
     *      console.log(`Hello, ${name}!`);
     * });
     *
     * emitter.emit("greet", "Alice");
     * // Output: Hello, Alice!
     */
    pipeOnce<K extends keyof T>(event: K, eventEmitter: EventEmitter<T>) {
        return this.once(event, (...arg: T[K]) => {
            eventEmitter.emitOnce(event, ...arg);
        });
    }
}
