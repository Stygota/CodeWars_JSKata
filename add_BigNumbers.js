"use strict";

function add(a, b, boolDebug=false) {
    let smallNumber, largeNumber, sumNumber = [], sum=0, boolCarry=false;
    if(a.length<b.length) { // figure out which is smaller and larger
        smallNumber = Array.from(a);
        largeNumber = Array.from(b);
    } else {
        smallNumber = Array.from(b);
        largeNumber = Array.from(a);
    }
    if(boolDebug) { console.log(`Smaller value: ${smallNumber}\nLarger value: ${largeNumber}`); }
    // handle addition right-to-left...
    smallNumber = smallNumber.reverse();
    largeNumber = largeNumber.reverse();

    for(let i=0; i<largeNumber.length; i++) { // process digits...
        sum=0;
        if(boolCarry) { // handle carry if any from previous ops
            sum+=1;
            boolCarry=false;
            if(boolDebug) { console.log(`Carry present [+1]`); }
        }
        sum+=+largeNumber[i];
        if(boolDebug) { console.log(`Pos [${i}] from right at [${sum}]`); }
        if(i<smallNumber.length) { // sum if inside small number
            sum+=+smallNumber[i];
            if(boolDebug) { console.log(`Pos [${i}] from right at [${sum}]`); }
        }
        if(sum>=10) { boolCarry=true; sum-=10; } // check for carry        
        sumNumber.unshift(sum.toString());
    }
    if(boolCarry) { // handle exit carry
        sumNumber.unshift('1');
        if(boolDebug) { console.log(`Final carry present [+1]`); }
    }

    return sumNumber.join('');
}

function test_add(a, b, expectedValue, boolDebug=false) {
    let testValue=add(a, b, boolDebug);
    console.assert(testValue===expectedValue, `Test value [${testValue}] did not match expected value [${expectedValue}]`);
}

test_add("1","1","2");
test_add("123","456","579");
test_add("888","222","1110");
test_add("1372","69","1441");
test_add("12","456","468");
test_add("101","100","201");
test_add("63829983432984289347293874", "90938498237058927340892374089", "91002328220491911630239667963");