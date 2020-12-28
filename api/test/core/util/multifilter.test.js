const multifilter = require('../../../core/util/multifilter');

const products = [
    { name: 'A', color: 'Blue', size: 50 },
    { name: 'B', color: 'Blue', size: 60 },
    { name: 'C', color: 'Black', size: 70 },
    { name: 'D', color: 'Green', size: 50 },
    { name: 'E', color: 'Red', size: 10 },
];

test('should return whole array of objects is filter is empty array', () => {
    const filters = {};
    const filtered = multifilter(products, filters);
    const expected = products;
    expect(filtered).toStrictEqual(expected);
});

test('should filter an array of objects with one level-depth, apply simple filter', () => {
    const filters = {
        color: ['Blue'],
        size: [50],
    };
    const filtered = multifilter(products, filters);
    const expected = [
      { name: 'A', color: 'Blue', size: 50 },
    ];
    expect(filtered).toStrictEqual(expected);
});

test('should not filter an array of objects if filter criterials are not appliable, apply simple filter', () => {
    const filters = {
        color: ['Blue'],
        size: [70],
    };
    const filtered = multifilter(products, filters);
    const expected = [];
    expect(filtered).toStrictEqual(expected);
});

test('should filter an array of objects with wrong filter criteria combination', () => {
    const filters = {
        color: ['wrong'],
        size: [50],
    };
    const filtered = multifilter(products, filters);
    const expected = [];
    expect(filtered).toStrictEqual(expected);
});

test('should filter an array of objects with one level-depth, apply complexe filter', () => {
    const filters = {
        color: ['BLUE', 'black'],
        size: [70, 50],
    };
    const filtered = multifilter(products, filters);
    const expected = [

    ];
    expect(filtered).toStrictEqual(expected);
});

test('should filter an array of objects with filter combination, apply complexe filter', () => {
    const filters = {
        color: ['Blue', 'Black'],
        size: [70, 50],
    };
    const filtered = multifilter(products, filters);
    const expected = [
        { name: 'A', color: 'Blue', size: 50 },
        { name: 'C', color: 'Black', size: 70 },
    ];
    expect(filtered).toStrictEqual(expected);
});

test('should return whole array if passing all properties', () => {
    const filters = {
        color: ['Blue', 'Black', 'Green', 'Red'],
        size: [10, 50, 60, 70],
    };
    const filtered = multifilter(products, filters);
    const expected = products;
    expect(filtered).toStrictEqual(expected);
})