function check(a, x) {
    for(let val of a) {
        if (val===x) { return true; } // we have a match
    }
    return false; // nothing found
}

function test_check (array, valToFind, boolExpected) {
    console.assert(check(array, valToFind)===boolExpected);
}

test_check([66, 101], 66, true);
test_check([101, 45, 75, 105, 99, 107], 107, true);
test_check(['t', 'e', 's', 't'], 'e', true);
test_check(['what', 'a', 'great', 'kata'], 'kat', false);