function solution(str){
    let pairs = [], splitStr = Array.from(str);
    let currChar = splitStr.shift(), charBuffer = '';
    while(currChar) {
      charBuffer=charBuffer.concat(currChar);
      currChar=splitStr.shift()??'_';
      if(currChar) { charBuffer=charBuffer.concat(currChar); }
      pairs.push(charBuffer);
      /* clear charBuffer, pull current char for next loop */
      charBuffer='';
      currChar=splitStr.shift();
    }
    
    return pairs;
}

function test_solution(str, expectedValue) {
    let testValue = solution(str);
    console.assert(deepCompare(testValue, expectedValue), `Test value [${testValue}] did not match [${expectedValue}]`);
}

function deepCompare(arr1, arr2) {
    /*  Checking if both are defined,
        have the same length,
        contain the same chars 1 deep for this exercise
    */
    // same size?
    if((arr1?.length??-1)===(arr2?.length??1)) {
        for(let i=0;i<arr1.length;i++) {
            if(arr1[i]===arr2[i]) { continue; }
            else { return false; }
        }

        return true;
    }

    return false;
}

test_solution('abcdef', ['ab','cd','ef']);
test_solution('abcdefg', ['ab', 'cd', 'ef', 'g_']);
test_solution('', []);
test_solution('abc', ['ab','c_']);