"use strict";

String.prototype.toJadenCase = function() {
  let strJadenCased = "", strCurrentChar;
  let blnFoundChar = false;
  let lngStartPos, lngEndPos;
  
  // I'm going to do this one old school
  // Simple scanning of the entire length of the string
  //   tracking scan start to space position
  // Buffering the "Jaden cased" string
  // Strings are immutable anyway, but will require roughly twice
  // the memory an in-place casing would take in another language
  // Well - my assumptions about how some things work under the hood
  // are probably wrong, but a multiple of what in-place would be
  // The scan should only be roughly O(n) - once for each character
  for(let i = 0; i < this.length; i++) {
    strCurrentChar = this.charAt(i);
    if(strCurrentChar == ' ') {
      // discard whitespace if no char found yet
      if(blnFoundChar === false) { continue; }
      else {
        lngEndPos = i;
        // end of "word", build buffer and update tracking info
        strJadenCased = `${strJadenCased}${this.charAt(lngStartPos).toUpperCase()}${this.slice(lngStartPos+1, lngEndPos+1)}`;
        lngStartPos = i;
        blnFoundChar = false;
        continue;
      }
    } else {
      // assumption here is anything besides whitespace is a valid char
      if(blnFoundChar === false) {
        lngStartPos = i;
        blnFoundChar = true;
        continue;
      } else {
        continue;
      }
    }
  }

  // Could probably roll this into the above loop
  // Flush any remaining stuff to buffer
  if(blnFoundChar === true) {
    lngEndPos = this.length;
    strJadenCased = `${strJadenCased}${this.charAt(lngStartPos).toUpperCase()}${this.slice(lngStartPos+1, lngEndPos+1)}`;   
  }

  return strJadenCased;
};

function test_toJadenCase(testString, expectedValue) {
  let testValue = testString.toJadenCase();
  console.assert(testValue === expectedValue, `\nTest string: [${testString}]\nTest Jaden Casing: [${testValue}]\nExpected Jaden Casing: [${expectedValue}]`);
}

test_toJadenCase("How can mirrors be real if our eyes aren't real", "How Can Mirrors Be Real If Our Eyes Aren't Real");