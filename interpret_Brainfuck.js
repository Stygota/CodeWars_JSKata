"use strict";

function brainLuck(code, input){
  const maxTapeVal = 255, dataTapeSize = 50000;
  let dataTape = Array(dataTapeSize).fill(0, 0, dataTapeSize), outputBuffer = [], dataPtr = 0, codePtr = 0
    , currInstruction, compare, brackCount;
  code = code.split('');
  input = input.split('');
  
  // assumptions for this exercise:
  // boundary increments / decrements wrap
  // cells hold values from 0-255 with under/overflow at the edges
  // no invalid instructions (bad symbols)
  do {
    currInstruction = code[codePtr];
    
    switch(currInstruction) {
      case '>':
        // move data pointer right
        dataPtr += 1;
        break;
      case '<':
        // move data pointer left
        dataPtr -= 1;
        break;
      case '+':
        // increment byte at data pointer with overflow
        compare = (dataTape[dataPtr]+1);
        compare = (compare > maxTapeVal) ? 0 : compare;
        dataTape[dataPtr] = compare;
        break;
      case '-':
        // decrement byte at data pointer with underflow
        compare = (dataTape[dataPtr]-1);
        compare = (compare > -1) ? compare : maxTapeVal;
        dataTape[dataPtr] = compare;
        break;
      case '.':
        // echo current data byte to output buffer
        outputBuffer.push(String.fromCharCode(dataTape[dataPtr]));
        break;
      case ',':
        // consume a byte of input
        if(input.length>0) {
          dataTape[dataPtr] = input.shift().charCodeAt(0);
        }
        break;
      case '[':
        brackCount = 1;
        // scan forward to next command after matching bracket
        // if current data is 0
        if(dataTape[dataPtr]==0) {
          // consume until new command found
          do {
            codePtr += 1;
            if(code[codePtr]==='[') {
              brackCount += 1;
            }
            if(code[codePtr]===']') {
              brackCount -= 1;
            }
            if(brackCount === 0) { break; }
          } while (codePtr < code.length);
        }
        break;
      case ']':
        brackCount = 1;
        // scan backwards to previous command before matching bracket
        // if current data is nonzero
        if(dataTape[dataPtr]>0) {
          // consume until new command found
          do {
            codePtr -= 1;
            if(code[codePtr]===']') {
              brackCount += 1;
            }
            if(code[codePtr]==='[') {
              brackCount -= 1;
            }
            if(brackCount === 0) {
              break;
            }
          } while (codePtr > 0);
        }
        break;
    }
    // advance tape
    codePtr += 1;
  } while (codePtr < code.length);
  
  return outputBuffer.join('');
}