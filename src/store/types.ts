/**
 * We use map because we'd like to preserve the order of keys
 */
export type NickNameMap = Map<string, string>;
export enum StoreOperation { ADD, NICK };
export type StoreNotification = {
    type: StoreOperation,
    name: string,
    nick?: string
};
export type NotifierFn = (msg: StoreNotification) => any | void;
export type Notifier = {
    registerNotifier: (fn: NotifierFn) => void;
    removeNotifier: () => void;
    add: (name: string) => void;
    nick: (name: string, nick: string) => void;
}
export type Wrapper<T> = {
    unwrap: () => T
}
export type GenericStore<T> = Wrapper<T> & Notifier;
export type ReducerFunction<T, P> = (store: GenericStore<T>, payload: P) => void;
export type DispatcherFunction<T> = (payload: T) => void;
export type Reducers<T = NickNameMap> = {
    [name: string]: ReducerFunction<T, any>
}
export type ReducerName = string;