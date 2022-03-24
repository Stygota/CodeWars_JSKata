"use strict";

// Thanks array cardio from JavaScript 30 for this elegant solution!

function count(string) {
    let occurrences = {}; // bookkeeping object
    /*
      The idea here:
      'Reduce' the string (in array form) by logging each
      character in our bookkeeping object; we're just going
      to pass back the bookkeeper at the end as our 'previous'
      value.  Don't forget to handle new characters (undefined props).
    */
    Array.from(string).reduce((tally, character) => {
        if (!tally[character]) { tally[character] = 0; }
        tally[character] += 1;
        return tally;
    }, occurrences);
    return occurrences;
}

function test_count(string, expectedValue) {
    let testValue = count(string);
    console.assert(deepCompare(testValue, expectedValue), `Test value [${testValue}] did not match expected value [${expectedValue}]`);
}

function deepCompare(first, second) {
    /*
        This 'deep' comparison is just a simple property-by-property comparison
        between 2 simple objects (nesting 1 layer).
        Also, really, this doesn't really do a check between objects for whether a property exists in both
        with the same value - properties have to exist in the same order as well...
    */
    let firstKeys = Object.keys(first), secondKeys = Object.keys(second);
    if (firstKeys.length !== secondKeys.length) {
        return false;
    } else {
        for (let i = 0; i < firstKeys.length; i++) {
            if (firstKeys[i] !== secondKeys[i]) {
                console.log(`${firstKeys[i]} ${secondKeys[i]}`);
                return false;
            }
        }

        return true;
    }
}

test_count('aba', { a: 2, b: 1 });
test_count('', {});
test_count('hey imma let you finish', { h: 1, e: 2, y: 2, ' ': 4, i: 3, m: 2, a: 1, l: 1, t: 1, o: 1, u: 1, f: 1, n: 1, s: 1 });