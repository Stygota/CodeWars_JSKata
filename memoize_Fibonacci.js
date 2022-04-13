"use strict";

// these initial values need to be BigInt, and comparisons
// and other operations need to operate on new BigInt objects
// created from whatever user values
// numbers are "loosely" equal, but there's all kinds of headache without
const cache = { 0: BigInt(0), 1: BigInt(1) };

function fibonacci(n) {
  if(typeof(cache[n])==='bigint') { return cache[n]; }
  
  cache[n] = fibonacci(n-1) + fibonacci(n-2);
  return cache[n];
}

function iterativeFibonacci(n) {
  for(let i=0; i<=n; i++) {
    cache[i+2] = cache[i] + cache[i+1];
  }
  
  return cache[n];
}

function test_fibonacci(n, expectedValue) {
    let testValue = fibonacci(n);
    // because of BigInt behavior, loose comparisons only between numbers and BigInts    
    console.assert(testValue===expectedValue, `Test value [${testValue}] did not match expected value [${expectedValue}]`);
}

function test_iterativeFibonacci(n, expectedValue) {
    let testValue = iterativeFibonacci(n);
    // because of BigInt behavior, loose comparisons only between numbers and BigInts
    console.assert(testValue===expectedValue, `Test value [${testValue}] did not match expected value [${expectedValue}]`);
}

test_fibonacci(70, BigInt('190392490709135'));
test_fibonacci(115, BigInt('483162952612010163284885'));
test_fibonacci(150, BigInt(" 9969216677189303386214405760200"));

test_iterativeFibonacci(70, BigInt('190392490709135'));
test_iterativeFibonacci(115, BigInt('483162952612010163284885'));
test_iterativeFibonacci(150, BigInt(" 9969216677189303386214405760200"));