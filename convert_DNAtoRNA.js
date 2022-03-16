"use strict";

function DNAtoRNA(dna) {
    if(dna) { // Do we have a non-empty string? (Or truthy value...)
        let dnaBases = Array.from(dna);
        let rnaBases = [];

        for(let base of dnaBases) {
            base = base.toUpperCase();
            switch(base) {
                case 'G':
                case 'C':
                case 'A':
                    /* G, C, & A are the same
                       Push those bad boys back out */
                    rnaBases.push(base);
                    break;
                case 'T':
                    /* T converts to U
                       Convert the non-believer */
                    rnaBases.push('U');
                    break;
                default:
                    throw "Invalid base detected in DNA sequence!"
            }
        }

        return rnaBases.join('');
    } else {
        return ""; // returning empty for a 'falsey' value or empty string currently...
        // throw "Please enter a valid DNA sequence!" // May not be appropriate for this test...just return `empty` or something...
    }
}

function testDNAtoRNA() {
    try {
        console.log(DNAtoRNA("")); // return ''
        console.log(DNAtoRNA("TTTT")); // UUUU
        //console.log(DNAtoRNA("CGT 1")); // error - invalid base
        console.log(DNAtoRNA("GCAT")); // GCAU
        console.log(DNAtoRNA("GACCGCCGCC")); // GACCGCCGCC
    } catch(err) {
        console.error(`Name: ${err.name} with Msg: ${err.message}`);
    }
}

testDNAtoRNA();