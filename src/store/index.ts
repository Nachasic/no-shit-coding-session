export * from './types';

import { DataStore } from './datastore';
import { ConnectFactory } from './subscriber';

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

initializeDataStore(datastore);


export const Connect = ConnectFactory(datastore);