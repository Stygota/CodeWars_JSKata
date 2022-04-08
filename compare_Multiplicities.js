"use strict";

function comp(array1, array2) {
    // Do we have valid (non-empty) arrays?
    if(!array1||!array2) { return false; }
    // Generate quick lookup for multiples
    let multLookup = countMultiples(array1);

    for(let num of array2) {
        // No lookup mult?  No dice.
        if(!multLookup[num]) { return false; }
        multLookup[num] -= 1;
        // Too many lookup mults?  No dice.
        if(multLookup[num] < 0) { return false; }
    }

    return true;
}

function countMultiples(countMe) {
    let counts = {}, multLookup = {};

    // Use counts as a tally object for each num in countMe
    countMe.reduce((a, b) => {
        if(!a[b]) { a[b] = 1; }
        else { a[b] += 1; }
        return a;
    }, counts);
    // 'Invert' the tally object to pair counts with squares
    // of each num in tally object
    for(let num in counts) {
        multLookup[num**2] = counts[num];
    }

    return multLookup;
}

function test_comp(array1, array2, boolExpectedValue) {
    console.assert(comp(array1, array2)===boolExpectedValue, `${array1} compared to ${array2} did not return expected value [${boolExpectedValue}]`);
}

let   a1 = [121, 144, 19, 161, 19, 144, 19, 11]
    , a2 = [11*11, 121*121, 144*144, 19*19, 161*161, 19*19, 144*144, 19*19];
test_comp(a1, a2, true);