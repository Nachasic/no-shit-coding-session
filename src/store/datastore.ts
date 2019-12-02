/**
 * Here we'll be describing our datastore
 * Main functions:
 * - store data;
 * - change data;
 * - report changes
 */
import { StoreNotification, StoreOperation, NickNameMap } from './types';

export class DataStore {
    static store: DataStore;
    private map: NickNameMap;
    private notifier: (msg: StoreNotification) => any | void;

    constructor () {
        if (DataStore.store) {
            return DataStore.store;
        }

        this.map = new Map();
        DataStore.store = this;

        return this;
    }

    public destroy () {
        DataStore.store = undefined;
    }

    public report () {
        return Array.from(this.map).reduce(
            (acc, [name, nick]) => Object.assign(acc, { [name]: nick }),
            {})
    }

    public registerNotifier (fn: (msg: StoreNotification) => any | void) {
        this.notifier = fn;
    }

    public add (name: string) {
        const notification: StoreNotification = {
            type: StoreOperation.ADD,
            name
        };

        this.map.set(name, '');
        this.notifier && this.notifier(notification);
    }

    public nick (name: string, nick: string) {
        const currentNick = this.map.get(name);

        if (nick === currentNick) {
            return;
        }

        const notification: StoreNotification = {
            type: StoreOperation.NICK,
            name,
            nick
        }

        this.map.set(name, nick);
        this.notifier && this.notifier(notification);
    }
}