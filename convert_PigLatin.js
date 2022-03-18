"use strict";

function pigIt(str){
    return str.split(' ').map(word => {
      let arr = Array.from(word);
      if(arr[0].match(/\w/)) { arr.push(arr.shift(), 'ay'); }
      return arr.join('');
    }).join(' ');
  }

  function test_pigIt(str, expectedValue) {
      let testValue = pigIt(str);
      console.assert(testValue===expectedValue, `Test value [${testValue}] did not equal expected value [${expectedValue}]`);
  }

  test_pigIt('Pig latin is cool', 'igPay atinlay siay oolcay');
  test_pigIt('This is my string', 'hisTay siay ymay tringsay');