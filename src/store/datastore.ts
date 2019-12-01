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

    constructor () {
        if (DataStore.store) {
            return DataStore.store;
        }

        this.map = new Map();
        DataStore.store = this;

        return this;
    }

    public destroy () {
        this.map = undefined;
    }

    public report () {

        console.log(this.map);
        return Array.from(this.map).reduce(
            (acc, [name, nick]) => Object.assign(acc, { [name]: nick }),
            {})
    }
}