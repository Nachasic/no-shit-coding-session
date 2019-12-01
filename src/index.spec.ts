import { helloWorld } from '.';

describe('Hello world tests', () => {
    it('should exist', () => {
        expect(helloWorld).toBeDefined();
    });

    it('should return a proper message', () => {
        expect(helloWorld).not.toThrowError();
        expect(helloWorld()).toBe('Hello, world!');
    });
})