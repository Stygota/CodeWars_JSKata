"use strict";

/*
    Converts the passed ipv4 address to a 32-bit integer representation
    Using return -1 as an invalid result here...
    @param          {string}    ip - String representing a valid ipv4 address
    @returns        {number}    ipAsInt32 - Number representing the 32-bit integer (int32) value of ip
*/
function ipToInt32(ip) {
    // 32-bit binary string representation of ip first...
    let bitString = parseIpToBitString(ip), shiftVal, atVal, ipAsInt32 = 0;
    // avoiding basic checks on ip here
    // parseIpToBitString does a few - brittle on hard-coded fail value
    if(parseInt(bitString) === -1) { return -1; }
    for(let i=31; i>=0; i--) {
        // declared shift and AND values here to avoid messy
        // coercions in the logic below...
        // working right-to-left, so subtract from max-length (31) to get correct exponent
        // using plain multiplication since the 1<31 edge-case (max-negative under 32-bit behavior)
        shiftVal = 2**(31 - i);
        atVal = parseInt(bitString.charAt(i));
        // using template literals to sum the final number via the
        // magic of bit-shifts
        // only looking at one position, so if 1 then sum current shift-value with total
        ipAsInt32 += (atVal === 1)?shiftVal:0;
    }
    return ipAsInt32;
}


    /*
        Converting the octets of a passed ipv4 address to a 32-bit binary string...
        Using return '-1' as an invalid or bad ip signifier here...
        @param      {string}    ip - String representing a valid ipv4 address
        @returns    {string}    bitString - String representing a 32-bit binary representation of the concatenated octets of ip
    */
function parseIpToBitString(ip) {
    let octets = ip.split('.'), bitString = '', currOctet, currValue, shiftVal, andVal;
    // basic sanity checks
    // malformed ipv4 address
    if(octets.length!==4) { return '-1'; }
    for(let i=0; i<octets.length; i++) {
        currOctet = +octets[i];
        currValue = '';
        // invalid range for current octet
        if(currOctet<0 || currOctet>255) { return '-1'; }
        // turning our integer (2^8) octet value into a bit-string via the
        // magic of shift multiplication and bitwise-AND
        for(let j=0; j<8; j++) {
            // declared shift and AND values here to avoid messy
            // coercions in the logic below...
            shiftVal = 1<<j;
            andVal = (currOctet&shiftVal);
            // using template literals to build the string right-to-left
            currValue = (andVal === shiftVal)?`1${currValue}`:`0${currValue}`;
        }
        // append translated octet bit-string onto total bit-string
        bitString = `${bitString}${currValue}`;
    }
    return bitString;
}

function test_ParseIpToBitString(ip, expectedValue) {
    let testValue = parseIpToBitString(ip);
    console.assert(testValue === expectedValue, `Test value [${testValue}] did not match expected value [${expectedValue}]`);
}

function test_ipToInt32(ip, expectedValue) {
    let testValue = ipToInt32(ip);
    console.assert(testValue === expectedValue, `Test value [${testValue}] did not match expected value [${expectedValue}]`);
}

test_ParseIpToBitString('128.32.10.1', '10000000001000000000101000000001');
test_ipToInt32('128.32.10.1', 2149583361);