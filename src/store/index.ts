export * from './types';

import { DataStore } from './datastore';
import { ConnectFactory } from './subscriber';
import { Injector, resolveActions } from './mutator';
import { DispatcherActions } from './types';

const INITIAL_STATE = {
    "Lawrence Fishbourne": "Morpheus",
    "Morgan Freeman": "Mr. Freeman",
    "Jackie Chan": "73RM1N470RRR",
    "Samuel L. Jackson": "Lawrence Fishbourne"
}

const initializeDataStore = (store: DataStore) => {
    for (const [name, nick] of Object.entries(INITIAL_STATE)) {
        store.add(name);
        store.nick(name, nick);
    }
}

const datastore = new DataStore();
const injector = new Injector(datastore);
const actions = {
    ADD_NEW: (store, payload: { name: string }) => {
        const { name } = payload;
        store.add(name);
    },
    CHANGE_NICK: (store, payload: { name: string, nick: string }) => {
        const { name, nick } = payload;

        store.nick(name, nick)
    }
}

initializeDataStore(datastore);


export const Connect = ConnectFactory(datastore, injector);
export const Inject = resolveActions(injector, actions);