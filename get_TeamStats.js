"use strict";

/**
 * @constant
 * @type {string}
 */
const RESULT_DELIMITER = "|";

/**
 * Creates a new race result for a single team member.
 */
class Result {
    /** @type {number} */
    #second;
    /** @type {number} */
    #minute;
    /** @type {number} */
    #hour;
    /**
     * @class
     * @param   {string} resultString - a single team member result delimited by RESULT_DELIMITER
     * @see     RESULT_DELIMITER
     */
    constructor(resultString) {
        let timeParts = resultString.split(RESULT_DELIMITER);
        this.#hour = +timeParts[0];
        this.#minute = +timeParts[1];
        this.#second = +timeParts[2];
    }
    /** @type {number} */
    get hourPart()      { return this.#hour; }
    /** @type {number} */    
    get minutePart()    { return this.#minute; }
    /** @type {number} */    
    get secondPart()    { return this.#second; }

    /**
     * Override for a RESULT_DELIMITER delimited aggregate result
     * @returns {string} Aggregate result with format hh(RESULT_DELIMITER)mm(RESULT_DELIMITER)ss
     */
    toString() {
        let   hourPart = this.hourPart.toLocaleString(undefined,{useGrouping:false,minimumIntegerDigits:2})
            , minutePart = this.minutePart.toLocaleString(undefined,{useGrouping:false,minimumIntegerDigits:2})
            , secondPart = this.secondPart.toLocaleString(undefined,{useGrouping:false,minimumIntegerDigits:2});

        return `${hourPart}${RESULT_DELIMITER}${minutePart}${RESULT_DELIMITER}${secondPart}`;
    }
}

/**
 * Take an input string representing team member results in hh(RESULT_DELIMITER)mm(RESULT_DELIMITER)ss format, comma-delimited, and process it to return
 * team stats covering range, average, and median.
 * 
 * @see         Result
 * @see         RESULT_DELIMITER
 * @param       {string} string - A string representing a set of delimited team results.  Results should be comma-delimited.
 * @returns     {string} A string of team stats for range, average, and median between members.  See composition functions for details.
 */
function stat(string) {
    // parse results - split up on assumed comma and generate Results array
    // sorting the array here makes sense to save on time between
    // multiple operations - it's needed for a few
    let results = string.split(',').map(result => new Result(result.trim())).sort( (a,b) => {
        return convertResultToSeconds(a)-convertResultToSeconds(b);
    });
    let upperResult = results[results.length-1], lowerResult = results[0], teamRange, teamMean, teamMedian;
    // array is sorted
    // rolling up range stuff here    
    teamRange = convertSecondsToResult(convertResultToSeconds(upperResult)-convertResultToSeconds(lowerResult));
    teamMean =  mean(results);
    teamMedian = median(results);

    return `Range: ${teamRange} Average: ${teamMean} Median: ${teamMedian}`;
}

/**
 * Return the mean result time from an array of team Results
 * @see         Result
 * @param       {Result[]}  results - An array of team results
 * @returns     {Result}    A Result containing the mean team result
 */
function mean(results) {
    let sum = 0, avg, hourPart, minutePart, secondPart;
    // Sum up results and divide the time out by
    // number of team members - average total seconds and convert back
    for(let i=0; i<results.length; i++) {
        sum+= convertResultToSeconds(results[i]);
    }
    // We drop any fractional seconds
    avg = Math.floor(sum / results.length);
    
    return convertSecondsToResult(avg);
}

/**
 * Return the median result time from an array of team Results
 * @see         Result
 * @param       {Result[]}  results - An array of team results
 * @returns     {Result}    A Result containing the median team result
 */
function median(results) {
    let midPoint =  Math.floor(results.length/2), lowerResult = results[midPoint-1]
                    , upperResult = results[midPoint], avg, hourPart, minutePart, secondPart;
    // Even or odd number of results?
    if(results.length%2 === 0) {
        // Even - average the lower and upper
        avg =   (convertResultToSeconds(lowerResult) + convertResultToSeconds(upperResult)) / 2;

        return convertSecondsToResult(avg);
    } else {
        // Odd - return upper result (true midpoint)
        return upperResult;
    }
}

/**
 * Converts a Result object to an equivalent number of seconds.
 * @see         Result
 * @param       {Result} result - A result object representing a result time
 * @returns     {number} A value representing the passed result's time as seconds
 */
function convertResultToSeconds(result) {
    return result.hourPart*3600 + result.minutePart*60 + result.secondPart;
}

/**
 * Converts a number of seconds to a valid Result object holding the hour, minute, and second parts
 * as hh(RESULT_DELIMITER)mm(RESULT_DELIMITER)ss
 * @see         Result
 * @see         RESULT_DELIMITER
 * @param       {number} seconds - The number of seconds to convert into a Result time
 * @returns     {Result} A new Result object containing the equivalent time as hour, minute, and second parts
 */
function convertSecondsToResult(seconds) {
    let   secondPart = seconds % 60
        , minutePart = (seconds - secondPart) % 3600
        , hourPart = seconds - minutePart - secondPart;

    // Drop potential fractional seconds
    secondPart = Math.floor(secondPart);
    // Convert from seconds back to minutes and hours
    minutePart /= 60;
    hourPart /= 3600;

    return new Result(`${hourPart}${RESULT_DELIMITER}${minutePart}${RESULT_DELIMITER}${secondPart}`);
}

/**
 * Unit test for stat
 * @see   RESULT_DELIMITER
 * @param {string} resultsString - String representing team results, comma-delimited, and time-part delimited as hh(RESULT_DELIMITER)mm(RESULT_DELIMITER)ss
 * @param {string} expectedValue - String representing the expected value
 */
function test_stat(resultsString, expectedValue) {
    let testValue = stat(resultsString);
    console.assert(testValue===expectedValue, `Test value [${testValue}] did not match expected value [${expectedValue}]`);
}

test_stat("01|15|59, 1|47|16, 01|17|20, 1|32|34, 2|17|17", "Range: 01|01|18 Average: 01|38|05 Median: 01|32|34");