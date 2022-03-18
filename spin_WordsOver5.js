"use strict";

function spinWords(string, boolDebug = false) {
    const regExpWords = /\w+/g // does not preserve whitespace...

    let words=string.match(regExpWords);
    if(boolDebug) { console.log(`Matched ${(words?.length)??0} words with RegExp ${regExpWords}`); }
    if(words?.length>0) { // Did we match on anything non-trivial?
        words = words.map( word => {
            if(boolDebug) { console.log(`Current word is [${word}]`); }
            if(word.length>4) { // only spin words of 5 or more letters
                if(boolDebug) { console.log(`Spinning word [${word}]`); }
                let revBuffer = [], wordBuffer = Array.from(word);
                for(let i=0; i<word.length; i++) { 
                    if(boolDebug) { console.log(`Word buffer [${wordBuffer}] // Reverse buffer [${revBuffer}]`); }
                    revBuffer.push(wordBuffer.pop());
                    if(boolDebug) { console.log(`\\==>> Word buffer [${wordBuffer}] // Reverse buffer [${revBuffer}]`); }
                }
                return revBuffer.join('');
            } else { return word; } // short words tossed back
        })

        return words.join(' ');
    } else return '';
}

function test_spinWords(string, expectedValue, boolDebug = false) {
    let testValue = spinWords(string, boolDebug);
    console.assert(testValue===expectedValue, `Test value [${testValue}] did not match expected value [${expectedValue}]`);
}

test_spinWords('Welcome', 'emocleW');
test_spinWords('Hey fellow warriors', 'Hey wollef sroirraw');
test_spinWords('This is a test', 'This is a test');
test_spinWords('This is another test', 'This is rehtona test');
test_spinWords('You are almost to the last test', 'You are tsomla to the last test');
test_spinWords('Just kidding there is still one more', 'Just gniddik ereht is llits one more');
test_spinWords('Seriously this is the last one', 'ylsuoireS this is the last one');