"use strict";

function removeChar(str) {
    return (str.length>2)?str.slice(1,-1):str;
}

function test_removeChar (word, strippedWord) {
    console.assert(removeChar(word)===strippedWord, {'word': word, 'strippedWord':strippedWord, message: `removeChar${word} does not equal expected ${strippedWord}`});
}

let word, strippedWord
word = 'controlTest', strippedWord = 'controlTes';
test_removeChar(word, strippedWord);
word = 'eloquent', strippedWord = 'loquen';
test_removeChar(word, strippedWord);
word = 'country', strippedWord = 'ountr';
test_removeChar(word, strippedWord);
word = 'person', strippedWord = 'erso';
test_removeChar(word, strippedWord);
word = 'place', strippedWord = 'lac';
test_removeChar(word, strippedWord);
word = 'ooopsss', strippedWord = 'oopss';
test_removeChar(word, strippedWord);