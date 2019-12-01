import { DataStore } from './datastore';
import { StoreOperation, StoreNotification } from './types';

describe('Data store tests', () => {
    let store;

    beforeEach(() => {
        store = new DataStore();
    })

    it('should exist', () => {
        expect(store).toBeDefined();
    });

    it('should report it\'s contents', () => {
        expect(store.report).toBeDefined();

        const report = store.report();

        expect(report).toEqual({})
    });

    it('should add records', () => {
        expect(store.add).toBeDefined();

        store.add('Billy');

        expect(store.report()).toEqual({ 'Billy': '' });
    });

    it('should set nicknames', () => {
        expect(store.nick).toBeDefined();

        store.add('Billy');
        store.nick('Billy', 'DoZZer');

        expect(store.report()).toEqual({ 'Billy': 'DoZZer' });
    });

    it('notifies of changes', () => {
        expect(store.registerNotifier).toBeDefined();

        const mock = jest.fn();
        store.registerNotifier(mock);
        store.add('Billy');

        expect(mock).toHaveBeenLastCalledWith({
            type: StoreOperation.ADD,
            name: 'Billy',
            nick: undefined
        });

        store.nick('Billy', 'DoZZer');
        expect(mock).toHaveBeenLastCalledWith({
            type: StoreOperation.NICK,
            name: 'Billy',
            nick: 'DoZZer'
        })
    });

    it('should NOT notify when nothing has changed', () => {
        const mock = jest.fn();
        store.registerNotifier(mock);
        store.add('Billy');
        store.nick('Billy', 'DoZZer');
        store.nick('Billy', 'DoZZer');

        expect(mock).toBeCalledTimes(2)
    })
});
