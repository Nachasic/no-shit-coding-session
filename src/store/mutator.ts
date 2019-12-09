/**
 * Here we'll be describing our abstraction for mutations
 * 
 * Main functions:
 * - Connect to view-layer in a decoupled manner;
 * - Describe mutations for the datastore
 */
import deepCopy from 'ts-deepcopy';
import 'reflect-metadata';

import { GenericStore, DispatcherActions, ReducerFunction } from './types';

const failsafeStore: GenericStore<any> = {
    unwrap: () => new Map(),
    registerNotifier: () => {},
    removeNotifier: () => {},
    add: () => {},
    nick: () => {}
}

export class Injector<T> {
    private injectionRegistry: Map<string, ReducerFunction<T, any>> = new Map();

    constructor (
        private dataStore: GenericStore<T> = failsafeStore
    ) {};

    public inject (token: string, dep: ReducerFunction<T, any>) {
        const existingDep = this.injectionRegistry.get(token);

        if (existingDep) {
            throw new Error(`Store injector: token ${token} is injected twice`);
        }
        this.injectionRegistry.set(token, dep);
    }

    public flush() {
        this.injectionRegistry = new Map<string, any>();
        this.dataStore = failsafeStore;
    }

    public get store () {
        return this.dataStore;
    }

    public resolve (token) {
        return this.injectionRegistry.get(token);
    }
}

const Inject = <T>(type: keyof T): ParameterDecorator =>
    (target, propertyKey, propertyIndex) => {
        const meta = Reflect.getMetadata('design:paramtypes', target);
        const newMeta = deepCopy(meta);

        newMeta[propertyIndex] = type;

        Reflect.defineMetadata('design:paramtypes', newMeta, target)
    }


export const resolveActions = <T extends DispatcherActions>(injector: Injector<any>, actions: T) => {
    for (const [name, action] of Object.entries(actions)) {
        if (typeof name === 'string') {
            injector.inject(name, action)
        }
    }

    return Inject as (action: keyof T) => ParameterDecorator
}