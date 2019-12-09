/**
 * Here we'll be describing our subscription abstraction
 * 
 * Main functions:
 * - Connect with a view-layer in a decoupled manner
 * - Receive notifications of store updates
 * - Tell the view to update when the notiication is received
 */

import 'reflect-metadata';
import { NickNameMap, NotifierFn, GenericStore } from './types';


type CustomElement = {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    readonly isConnected: boolean;
}
export type Constructor<T> = new (...args: any[]) => T;
type Connectable<T> = CustomElement & {
    onStateUpdate?: (state: T) => void;
}

export const Connect = (store: GenericStore<NickNameMap>) =>
    <T extends Constructor<Connectable<any>>>(constructor: T) => {
        // const metadata = Reflect.getMetadata('design:paramtypes', constructor);
        // const argsNum = metadata ? metadata.length : 0;
        // let injectedArgs = [];

        // if (metadata) {
        //     injectedArgs = metadata
        //         .filter(token => typeof token === 'string')
        //         .map((token: string) => Injector.resolve(token));
        // }

        // const shouldInject = injectedArgs.length === argsNum;

        return class Connected extends constructor {
            private notifier: NotifierFn;

            constructor (...args: any[]) {
                // if (shouldInject && args.length === 0) {
                //     super(...injectedArgs)
                // } else {
                    super(...args)
                // }

                this.notifier = () => this.onStateUpdate(store.unwrap());
            }

            connectedCallback() {
                if (super.connectedCallback) {
                    super.connectedCallback();
                }

                if (!this.onStateUpdate) {
                    return;
                }

                store.registerNotifier(this.notifier)
            }
        
            disconnectedCallback() {
                store.removeNotifier();
            }
        }
    }
