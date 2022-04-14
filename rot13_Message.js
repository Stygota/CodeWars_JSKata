"use strict";

function rot13(message){
  // bounds for rot-13 check
  const lCaseLowerBound = 'a'.charCodeAt(), lCaseUpperBound = 'z'.charCodeAt()
    , uCaseLowerBound = 'A'.charCodeAt(), uCaseUpperBound = 'Z'.charCodeAt();
  // convert to array for processing
  let messageArray = message.split(''), currCharacter, upperBound, lowerBound;
  
  for(let i=0; i<messageArray.length; i++) {
    currCharacter = messageArray[i].charCodeAt();
    // lowercase check
    lowerBound = lCaseLowerBound;
    upperBound = lCaseUpperBound;
    if(checkCharValue_isBetween(currCharacter, lowerBound, upperBound)) {
      messageArray[i] = String.fromCharCode(shiftCharValue_13(currCharacter, lowerBound, upperBound));
      // I could extract refactor, but here, continue is appropriate
      continue;
    }
    // uppercase check
    lowerBound = uCaseLowerBound;
    upperBound = uCaseUpperBound;
    if(checkCharValue_isBetween(currCharacter, lowerBound, upperBound)) {
      messageArray[i] = String.fromCharCode(shiftCharValue_13(currCharacter, lowerBound, upperBound));
      // I could again extract refactor, and loop on a bounds array, but continue is appropriate
      continue;
    }
  }
  
  return messageArray.join('');
}  
  
// checks if a char value is between two bounds, inclusive
function checkCharValue_isBetween(charValue, lowerBound, upperBound) {
  if(charValue >= lowerBound && charValue <= upperBound) { return true; }
  return false;
}
  
// shifts a character value by 13 with respect to a modulus "boundary"
function shiftCharValue_13(charValue, lowerBound, upperBound) {
  return (charValue - lowerBound + 13)%(upperBound - lowerBound + 1) + lowerBound;
}