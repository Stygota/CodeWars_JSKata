"use strict";

function squareSum(numbers){
    let sum = 0;

    sum=(numbers.length>0)?numbers.reduce((sum, currNum) => {return sum + currNum**2;}, sum):sum;
    return sum;
}

function test_squareSum(numbers, expectedValue) {
    console.assert(squareSum(numbers)===expectedValue, {'numbers':numbers, 'expectedValue':expectedValue, 'message':`sum of squares of numbers not equal to ${expectedValue}`});
}

test_squareSum([1,2], 5);
test_squareSum([0,3,4,5], 50);
test_squareSum([], 0);