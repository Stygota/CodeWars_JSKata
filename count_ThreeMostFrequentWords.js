"use strict";
/**
 * @param {string} text - The text to analyze for the 3 most frequently occurring words.
 * @param {boolean} [boolDebug=false] - Should I output debug logging information?
 * @returns {string[]} Array of the three most frequently occurring words or an empty array if none.
 * Returns the 3 most frequent words in an input text in descending order of frequency.
 * - Words consist of a string of letters (A to Z) with optional apostrophes (').
 * - Apostrophes can be anywhere in a word (start, middle, or end).
 * - Other punctuation acts as a delimiter (word-break) - treat as whitespace boundaries or similar.
 * - Matches are case-insensitive for this exercise, and the words in the result should be lowercased.
 * - Ties can be broken arbitrarily.
 * - If fewer than 3 words are present in a text, return the top 2 or top words (only word).
 * - Return an empty array if there are no words (empty text, only punctuation, etc.)
 */
function topThreeWords(text, boolDebug = false) {
    // this is a no regex version
    // should be quick and clean
    // assuming we are cleaning our text and converting to lowercase
    const wordTokens = {
          "a" : true
        , "b" : true
        , "c" : true
        , "d" : true
        , "e" : true
        , "f" : true
        , "g" : true
        , "h" : true
        , "i" : true
        , "j" : true
        , "k" : true
        , "l" : true
        , "m" : true
        , "n" : true
        , "o" : true
        , "p" : true
        , "q" : true
        , "r" : true
        , "s" : true
        , "t" : true
        , "u" : true
        , "v" : true
        , "w" : true
        , "x" : true
        , "y" : true
        , "z" : true
        , "'" : false
        ,
    }

    let boolHasLetters = false, wordBuffer = '', currChar = '', currCount, wordCounts = {};

    // clean up our input
    text = text.trim().toLowerCase();
    if(boolDebug) {
        console.group('Cleaned text:');
        console.debug(text);
        console.groupEnd();
    }

    // convert to array of characters
    text = text.split('');
    if(boolDebug) {
        console.group('Tokenized char array:');
        console.dir(text);
        console.groupEnd();
    }

    // scan for valid tokens
    // build buffer until invalid token is hit
    // store 'word' in counts - either create an entry or increment existing entry
    if(boolDebug) { console.group('Scanning char array for words...'); }
    for(let i = 0; i < text.length; i++) {
        currChar = text[i];
        if(boolDebug) { console.debug(`currChar [${currChar}]`); }
        if(wordTokens[currChar] !== undefined) {
            // valid token
            wordBuffer = `${wordBuffer}${currChar}`;
            boolHasLetters = (wordTokens[currChar]) ? true : boolHasLetters;
            if(boolDebug) { console.debug(`currBuffer [${wordBuffer}]`); }
        } else {
            // invalid token - terminate current word, push count
            // only push a new word if we have at least one letter
            if (wordBuffer.length > 0 && boolHasLetters) {
                currCount = wordCounts[wordBuffer];
                if(boolDebug) { console.debug(`Dumping <${wordBuffer}> to counts collection - current count (${(currCount===undefined)?0:currCount})`); }
                wordCounts[wordBuffer] = (currCount===undefined) ? 1 : currCount + 1;
            }
            wordBuffer = '';
            boolHasLetters = false;
        }
    }
    // dump unflushed word buffer - could probably refactor and method extract a few things...
    if (wordBuffer.length > 0 && boolHasLetters) {
        currCount = wordCounts[wordBuffer];
        if(boolDebug) { console.debug(`Final dump <${wordBuffer}> to counts collection - current count (${(currCount===undefined)?0:currCount})`); }
        wordCounts[wordBuffer] = (currCount===undefined) ? 1 : currCount + 1;
    }    
    if(boolDebug) {
        console.groupEnd();
        console.group('Word Counts:');
        console.dir(wordCounts);
        console.groupEnd();
    }

    // Per our namesake, find the 3 most frequent words
    return findNMostFrequent(wordCounts, 3, boolDebug);
}

/**
 * @param {Object} counts - Frequency (counts) object of format { word : count }.
 * @param {number} numberTopN - Find top N most frequent words from {@link counts}.
 * @param {boolean} [boolDebug=false] - Should I output debug logging information?
 * @returns {String[]} A string array of the N most frequent words in {@link counts} or an empty array if nothing.
 * Finds the top N most (or best effort) frequent words from a passed counts object sorted by descending frequency.
 */
function findNMostFrequent(counts, numberTopN, boolDebug = false) {
    const keys = Object.keys(counts);
    let wordsTopN = new Array(numberTopN);
    let currWord = '', nextWord = '', insertWord = '';

    if(boolDebug) { console.debug(`Finding (${numberTopN}) most frequent words...`); }

    // no counts? we're not considering symbols here...
    if(keys.length===0) { return []; }

    for(let key in keys) {
        insertWord = keys[key];
        if(boolDebug) { console.group(`Current word [${insertWord}]`); }
        for(let i = 0; i < wordsTopN.length; i++) {
            currWord = wordsTopN[i];
            if(boolDebug) { console.debug(`Analyzing position ${i} / curVal [${currWord}]`); }

            // empty spot? insert
            if(currWord===undefined) { 
                wordsTopN[i] = insertWord;
                if(boolDebug) { console.debug(`Slotted ${insertWord}`); }
                break;
            }
            // current word more frequent, continue
            if(counts[currWord] >= counts[insertWord]) { 
                if(boolDebug) { console.debug(`Passed`); }
                continue;
            }

            // kick the can down the street until we find the right spot
            // shuffle everything down one position before installing new word
            if(boolDebug) { console.debug(`Slotting ${insertWord} @ position (${i}) - shuffling remaining most frequent`); }
            for(let j = i+1; j< wordsTopN.length; j++) {
                nextWord = wordsTopN[j]
                if(boolDebug) { console.debug(`Shuffling position ${j} / curVal [${nextWord}]`); }
                // shuffle until nothing is left (handle fill conditions)f
                if(currWord!==undefined) {
                    if(boolDebug) { console.debug(`Shuffled ${currWord} @ position ${j}`); }
                    wordsTopN[j] = currWord;
                    currWord = nextWord;
                } else {
                    if(boolDebug) { console.debug(`Shuffle complete!`); }
                    // no need to continue
                    break;
                }
            }
            // now we slot the new more frequent word
            wordsTopN[i] = insertWord;
            if(boolDebug) { console.debug(`Slotted ${insertWord} @ position(${i})`); }
            // we've slotted our item AND shuffled remaining items - no need to continue
            break;
        }
        if(boolDebug) { console.groupEnd(); }
    }

    // too lazy to iterate and push or condense out undefined values ATM
    return wordsTopN.filter(word => word!==undefined);
}

function test_topThreeWords(text, expectedValue, boolDebug=false) {
    const timerLabel = 'test';
    if(boolDebug) { console.time(timerLabel); }
    let results = topThreeWords(text, boolDebug);
    if(boolDebug) {
        console.group('Results:');
        console.dir(results);
        console.groupEnd();
        console.group('Expected:');
        console.dir(expectedValue);
        console.groupEnd();
    }
    console.assert(arrayShallowCompare(results, expectedValue, boolDebug), `results did not match expected values`);
    if(boolDebug) { console.timeEnd(timerLabel); }
    //console.assert(squareSum(numbers)===expectedValue, {'numbers':numbers, 'expectedValue':expectedValue, 'message':`sum of squares of numbers not equal to ${expectedValue}`});
}

/**
 * @param {Array} testValues
 * @param {Array} expectedValues 
 * @param {boolean} [boolDebug=false] - Should I output debug logging information?
 * @returns {boolean} True if shallow elements are the same; false otherwise.
 * Quick, dirty, STRICT shallow array comparison.  {@link testValues} and {@link expectedValues} should be the same size. 
 */
function arrayShallowCompare(testValues, expectedValues, boolDebug=false) {
    if(boolDebug) {
        console.debug('Comparing test and expected values...');
        console.group('Test values:');
        console.dir(testValues);
        console.groupEnd();
        console.group('Expected values:');
        console.dir(expectedValues);
        console.groupEnd();
    }
    for(let i = 0; i < testValues.length; i++) {
        if(boolDebug) {
            console.group('Current comparison:');
            console.debug(`Test [${testValues[i]}] against Expected [${expectedValues[i]}]`);
            console.groupEnd();
        }
        if(testValues[i] !== expectedValues[i]) { return false;}
    }

    return true;
}

const testText = [
      "In a village of La Mancha, the name of which I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing. An olla of rather more beef than mutton, a salad on most nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra on Sundays, made away with three-quarters of his income."
    , "e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"
    , "  //wont won't won't"
    ,
];
const resultValues = [
      ["a", "of", "on"]
    , ["e", "ddd", "aa"]
    , ["won't", "wont"]
    ,
];
let text = '', expected = [];

for(let i = 0; i < testText.length; i++) {
    text = testText[i];
    expected = resultValues[i];
    test_topThreeWords(text, expected, false);
}

// test_topThreeWords("  //wont won't won't", ["won't", "wont"], true);