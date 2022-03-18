"use strict";

function disemvowel(str, boolDebug = false) {
    // RegExps seem too easy (and really just roll up what I'm about to write)
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let arrStr = Array.from(str), i;
    
    for(let rmVowel of vowels) {
        i = arrStr.length-1;
        if(boolDebug) { console.log(`current vowel [${rmVowel}]`); }
        while(i>=0) {
            if(boolDebug) { console.log(`current troll string letter [${arrStr[i]}]`); }
            if(arrStr[i].toLowerCase()===rmVowel) { 
                if(boolDebug) { console.log(`Match at pos[${i}] on vowel [${rmVowel}]`); }
                arrStr[i] = '';
            }
            i--;
        }
    }
    
    return arrStr.join('');
  }

  function test_disemvowel(str, expectedValue, boolDebug = false) {
      let testValue = disemvowel(str, boolDebug);
      console.assert(expectedValue===testValue, `Expected value [${expectedValue}] did not match test value [${testValue}]`);
  }

  test_disemvowel('This website is for losers LOL!', 'Ths wbst s fr lsrs LL!');
  test_disemvowel('No offense but,\nYour writing is among the worst I\'ve ever read', 'N ffns bt,\nYr wrtng s mng th wrst \'v vr rd');
  test_disemvowel('What are you, a communist?', 'Wht r y,  cmmnst?');