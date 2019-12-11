/**
 * Here we'll be describing our subscription abstraction
 * 
 * Main functions:
 * - Connect with a view-layer in a decoupled manner
 * - Receive notifications of store updates
 * - Tell the view to update when the notiication is received
 */

import 'reflect-metadata';
import { NickNameMap, NotifierFn, GenericStore, ReducerName } from './types';
import { Injector } from './mutator';


type CustomElement = {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
}
export type Constructor<T> = new (...args: any[]) => T;
type Connectable<T> = CustomElement & {
    onStateUpdate: (state: T) => void;
}

export const ConnectFactory = (store: GenericStore<NickNameMap>, injector: Injector<NickNameMap>) =>
    <T extends Constructor<Connectable<any>>>(constructor: T) => {
        const paramsMeta = Reflect.getMetadata('design:paramtypes', constructor);
        const paramsNum = paramsMeta ? paramsMeta.length : 0;
        let injectedParams = [];

        if (paramsMeta) {
            injectedParams = paramsMeta
                .filter(paramType => typeof paramType === 'string')
                .map((paramType: string) => {
                    const dispatch = injector.resolve(paramType as ReducerName);

                    return (payload: any) => dispatch(store, payload)
                });
        }

        const shouldInject = injectedParams.length === paramsNum;

        return class Connected extends constructor {
            private notifier: NotifierFn;

            constructor (...args: any[]) {
                super();
                if (shouldInject && args.length === 0) {
                    super(...injectedParams)
                } else {
                    super(...args)
                }

                this.notifier = () => this.onStateUpdate(store.unwrap());
            }

            connectedCallback() {
                if (super.connectedCallback) {
                    super.connectedCallback();
                }

                if (!this.onStateUpdate) {
                    return;
                }

                store.registerNotifier(this.notifier);
                this.onStateUpdate(store.unwrap())
            }

            disconnectedCallback() {
                store.removeNotifier();
            }
        }
    }
