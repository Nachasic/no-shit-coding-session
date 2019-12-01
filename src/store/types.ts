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