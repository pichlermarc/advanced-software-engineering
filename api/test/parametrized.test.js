/**
 * https://zetcode.com/javascript/jest/
 */

describe('Should show how to use parametrized test', () => {

    test.each([[1, 1, 2], [-1, 2, 1], [2, 1, 3]])(
        '%i + %i equals %i', (a, b, expected) => {
            expect(a + b).toBe(expected);
        },
    );
})
