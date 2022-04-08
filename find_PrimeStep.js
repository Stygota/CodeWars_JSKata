"use strict";

function step(g, m, n) {
    let primesBetween = [], gap;

    // build our array of primes between m and n
    for (let i = m; i <= n; i++) {
        if (isPrime(i)) { primesBetween.push(i); }
    }

    // basic test for gaps
    for (let i = 0; i < primesBetween.length; i++) {
        for (let j = i + 1; j < primesBetween.length; j++) {
            gap = primesBetween[j] - primesBetween[i];
            if (gap === g) {
                return [primesBetween[i], primesBetween[j]];
            }
        }
    };

    return null;
}

function isPrime(num) {
    /** 
     * dumb, lazy method for prime testing
     * we only need to search up to the square root
     * i'm not approximating square roots or bounding anything
     * or even doing a sieve or something
     */
    // default condition - less than 2 is not prime
    if (num < 2) { return false; }

    for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
        if (num % i === 0) { return false; }
    }

    return true;
}