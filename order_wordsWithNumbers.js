"use strict";

function order(words, boolDebug) {
    const regExpWords = /(\s*\w+)/g // words with optional leading space (valid simple combos)
    const regExpNumbers = /(\d)+/ // just a simple number of 1 or more digits
    let wordParts = words.match(regExpWords);

    if(wordParts?.length>0) { // matches for words?
        if(wordParts[0]==='') { return ''; } // empty string with no param and other edge cases
        else {
            /*  Gonna assume (as per the contract)
                there's a valid number in each word
                and that numbers are unique (no need to bubble equivalents) */
            wordParts.sort((a, b) => {
                /*  Chose to use a regexp here because iterating to find valid
                    numbers is tedious and less-readable */
                let aOrder = a.match(regExpNumbers)[0];
                let bOrder = b.match(regExpNumbers)[0];
                if(boolDebug) { console.log(`a: ${a}\nb: ${b}\naOrd - bOrd: ${aOrder-bOrder}`); }
                return aOrder-bOrder;
            });

            for(let i=0; i<wordParts.length; i++) { // forEach, map, filter, etc. are slower for really large sets, just wanted to do this
                wordParts[i] = wordParts[i].trim();
            }
            return wordParts.join(' ');
        }
    } else {
        return '';
    }
}

function test_order (words, expectedValue, boolDebug = false) { // Need to start incorporating default values for optional args when it makes sense
    let testValue = order(words, boolDebug);
    console.assert(testValue===expectedValue, `Test value [${testValue}] differed from expected value [${expectedValue}]`);
}

test_order('is2 Thi1s T4est 3a', 'Thi1s is2 3a T4est');
test_order('4of Fo1r pe6ople g3ood th5e the2', 'Fo1r the2 g3ood 4of th5e pe6ople');
test_order('', '');