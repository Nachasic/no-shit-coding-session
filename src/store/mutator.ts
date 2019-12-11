/**
 * Here we'll be describing our abstraction for mutations
 * 
 * Main functions:
 * - Connect to view-layer in a decoupled manner;
 * - Describe mutations for the datastore
 */
import deepCopy from 'ts-deepcopy';
import 'reflect-metadata';

import { GenericStore, Reducers, ReducerFunction, ReducerName } from './types';

const failsafeStore: GenericStore<any> = {
    unwrap: () => new Map(),
    registerNotifier: () => {},
    removeNotifier: () => {},
    add: () => {},
    nick: () => {}
}

export class Injector<T> {
    private injectionRegistry: Map<
        ReducerName,
        ReducerFunction<T, any>
    > = new Map();

    constructor (
        private dataStore: GenericStore<T> = failsafeStore
    ) {};

    public get store () {
        return this.dataStore;
    }

    public inject (name: ReducerName, reducer: ReducerFunction<T, any>) {
        const existingDep = this.injectionRegistry.get(name);

        if (existingDep) {
            throw new Error(`Store injector: reducer ${name} is injected twice`);
        }
        this.injectionRegistry.set(name, reducer);
    }

    public flush() {
        this.injectionRegistry = new Map<ReducerName, ReducerFunction<T, any>>();
        this.dataStore = failsafeStore;
    }

    public resolve (name: ReducerName): ReducerFunction<T, any> {
        return this.injectionRegistry.get(name);
    }
}

const Inject = <T>(reducerName: keyof T): ParameterDecorator =>
    (target, propertyKey, propertyIndex) => {
        const meta = Reflect.getMetadata('design:paramtypes', target);
        const newMeta = deepCopy(meta);

        newMeta[propertyIndex] = reducerName;

        Reflect.defineMetadata('design:paramtypes', newMeta, target)
    }

export const resolveReducers = <T extends Reducers>(injector: Injector<any>, reducers: T) => {
    for (const [name, reducer] of Object.entries(reducers)) {
        if (typeof name === 'string') {
            injector.inject(name, reducer)
        }
    }

    return Inject as (action: keyof T) => ParameterDecorator
}