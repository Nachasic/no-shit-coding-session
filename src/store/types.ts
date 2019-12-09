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
}
export type Wrapper<T> = {
    unwrap: () => T
}
export type GenericStore<T> = Wrapper<T> & Notifier;