/**
 * Multifilter filters objects stored in Array 'arr' with filter 'filters'.
 * https://gist.github.com/jherax/f11d669ba286f21b7a2dcff69621eb72
 * @param arr The array to apply filter on.
 * @param filters The filter for the array.
 * @returns {*}
 */
const multiFilter = (arr, filters) => {
    const filterKeys = Object.keys(filters);
    return arr.filter(eachObj => {
        return filterKeys.every(eachKey => {
            if (!filters[eachKey].length) {
                return true; // passing an empty filter means that filter is ignored.
            }
            return filters[eachKey].includes(eachObj[eachKey]);
        });
    });
};

module.exports = multiFilter;
