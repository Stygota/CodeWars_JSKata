"use strict";

function sortTheInnerContent(words) {
  const regExWords = /\s?\w+/g
  const regExStartWhitespace = /^\s/;
  
  let wordsToRot = words.match(regExWords);
  wordsToRot = wordsToRot.map( (word) => {
    if(word.length > 2) {
        // move start of slice 1 right if first char is whitespace
        let sliceStart = (regExStartWhitespace.test(word))?2:1;
        let innerContent = Array.from(word.slice(sliceStart, -1)); // grab inner content from 1 to length-2
        innerContent.sort( (a, b) => {return (a<b)?1:-1}); // sort our inner content descending
        /* Wrap our sorted middle with the first and last letters */
        innerContent.unshift(word.slice(0, sliceStart)); // tack on omitted 1st chars
        innerContent.push(word.charAt(word.length-1));

        return innerContent.join(''); // back to strings we go
    } else { return word; } // 2 letters or less, leave me be
  })                             
  
  return wordsToRot.join('');
}

function test_sortTheInnerContent() {
    console.log(sortTheInnerContent('sort the inner content in descending order'));
    console.log(sortTheInnerContent('wait for me'));
    console.log(sortTheInnerContent('this kata is easy'));
}

test_sortTheInnerContent();